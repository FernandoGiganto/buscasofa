import React from 'react';

interface FuelFiltersProps {
    provinces: string[];
    cities: string[];
    searchTerm: string;
    selectedProvince: string;
    selectedCity: string;
    selectedFuel: string;
    hasActiveFilters: boolean;
    onSearchChange: (value: string) => void;
    onProvinceChange: (value: string) => void;
    onCityChange: (value: string) => void;
    onFuelChange: (value: string) => void;
    onClear: () => void;
}

const FuelFilters: React.FC<FuelFiltersProps> = ({
    provinces,
    cities,
    searchTerm,
    selectedProvince,
    selectedCity,
    selectedFuel,
    hasActiveFilters,
    onSearchChange,
    onProvinceChange,
    onCityChange,
    onFuelChange,
    onClear,
}) => (
    <div className="fuel-filters">
        <label>
            Buscar
            <input
                data-cy="station-search"
                type="search"
                value={searchTerm}
                placeholder="Nombre, dirección o municipio"
                onChange={e => onSearchChange(e.target.value)}
            />
        </label>
        <label>
            Provincia
            <select
                data-cy="province-filter"
                value={selectedProvince}
                onChange={e => onProvinceChange(e.target.value)}
            >
<<<<<<< HEAD
            <option value="">Provincia</option>
            {provinces.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
            ))}
=======
                <option value="">Provincia</option>
                {provinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                ))}
>>>>>>> b070265 (pruebas nuevas)
            </select>
        </label>
        <label>
            Ciudad
            <select
                data-cy="city-filter"
                value={selectedCity}
                onChange={e => onCityChange(e.target.value)}
            >
<<<<<<< HEAD
            <option value="">Ciudad</option>
            {cities.map(city => (
                <option key={city} value={city}>{city}</option>
            ))}
=======
                <option value="">Ciudad</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
>>>>>>> b070265 (pruebas nuevas)
            </select>
        </label>
        <label>
            Combustible
            <select
                data-cy="fuel-filter"
                value={selectedFuel}
                onChange={e => onFuelChange(e.target.value)}
            >
<<<<<<< HEAD
            <option value="">Tipo de combustible</option>
            <option value="Precio Gasoleo A">Gasóleo A</option>
            <option value="Precio Gasolina 95 E5">Gasolina 95 E5</option>
=======
                <option value="">Tipo de combustible</option>
                <option value="Precio Gasoleo A">Gasóleo A</option>
                <option value="Precio Gasolina 95 E5">Gasolina 95 E5</option>
>>>>>>> b070265 (pruebas nuevas)
            </select>
        </label>
        <button
            data-cy="clear-filters"
            type="button"
            onClick={onClear}
            disabled={!hasActiveFilters}
        >
            Limpiar filtros
        </button>
    </div>
);

export default FuelFilters;
