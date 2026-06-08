import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FuelFilters from './FuelFilters';
import './FuelTable.css';

const PAGE_SIZE = 20;

const FuelTable = ({ stations }) => {

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');

  // Orden
  const [sortField, setSortField] = useState<string>('Precio Gasoleo A');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);


  // Provincias y ciudades únicas
  const provinces = useMemo(
    () => Array.from(new Set(stations.map(s => s.Provincia))).sort(),
    [stations]
  );
  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          stations
            .filter(s => !selectedProvince || s.Provincia === selectedProvince)
            .map(s => s.Municipio)
        )
      ).sort(),
    [stations, selectedProvince]
  );

  // Filtrado
  const filteredStations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es');

    return stations.filter(station => {
      const searchableText = [
        station['Rótulo'],
        station['Dirección'],
        station.Municipio,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('es');
      const matchSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchProvince = !selectedProvince || station.Provincia === selectedProvince;
      const matchCity = !selectedCity || station.Municipio === selectedCity;
      const matchFuel =
        !selectedFuel ||
        (station[selectedFuel] && station[selectedFuel].replace(',', '.') !== '' && station[selectedFuel] !== '-');
      return matchSearch && matchProvince && matchCity && matchFuel;
    });
  }, [stations, searchTerm, selectedProvince, selectedCity, selectedFuel]);

  // Ordenación
  const sortedStations = useMemo(() => {
    if (!selectedFuel) return filteredStations;
    return [...filteredStations].sort((a, b) => {
      const aVal = parseFloat((a[sortField] || '0').replace(',', '.')) || 0;
      const bVal = parseFloat((b[sortField] || '0').replace(',', '.')) || 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filteredStations, sortField, sortOrder, selectedFuel]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(sortedStations.length / PAGE_SIZE));
  const paginatedStations = sortedStations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Cambiar orden
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedFuel('');
  };

  const hasActiveFilters = Boolean(
    searchTerm || selectedProvince || selectedCity || selectedFuel
  );

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProvince, selectedCity, selectedFuel]);


  return (
    <div>
      <h2>Precios de combustibles en gasolineras españolas</h2>
      <FuelFilters
        provinces={provinces}
        cities={cities}
        searchTerm={searchTerm}
        selectedProvince={selectedProvince}
        selectedCity={selectedCity}
        selectedFuel={selectedFuel}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchTerm}
        onProvinceChange={handleProvinceChange}
        onCityChange={setSelectedCity}
        onFuelChange={setSelectedFuel}
        onClear={clearFilters}
      />
      <p className="results-count" data-cy="results-count" aria-live="polite">
        {sortedStations.length} {sortedStations.length === 1 ? 'gasolinera encontrada' : 'gasolineras encontradas'}
      </p>
      <table className="fuel-table">
        <thead>
          <tr>
            <th>Gasolinera</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>
              <button
                className="sortable"
                onClick={() => handleSort('Precio Gasoleo A')}
              >
                Gasóleo A {sortField === 'Precio Gasoleo A' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>
              <button
                className="sortable"
                onClick={() => handleSort('Precio Gasolina 95 E5')}
              >
                Gasolina 95 E5 {sortField === 'Precio Gasolina 95 E5' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStations.length === 0 && (
            <tr>
              <td className="empty-results" colSpan={6}>
                No hay gasolineras que coincidan con los filtros.
              </td>
            </tr>
          )}
          {paginatedStations.map((station, idx) => (
            <tr key={station.IDEESS || idx}>
              <td>{station['Rótulo']}</td>
              <td>{station['Dirección']}</td>
              <td>{station['Municipio']}</td>
              <td>{station['Precio Gasoleo A']}</td>
              <td>{station['Precio Gasolina 95 E5']}</td>
              <td>
                <Link
                  to={`/station/${station.IDEESS}`}
                  state={{
                    gobackLink: "/lista"
                  }}
                >
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          {'<<'}
        </button>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          {'<'}
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          {'>'}
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default FuelTable;
