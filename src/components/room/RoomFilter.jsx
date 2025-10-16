// src/components/room/RoomFilter.jsx
import { LANGUAGE_PAIRS, LANGUAGE_LEVELS } from '../../utils/constants';

export default function RoomFilter({ 
  selectedLanguage, 
  setSelectedLanguage,
  selectedLevel,
  setSelectedLevel 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Language Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Language Pair
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="input-field"
        >
          <option value="all">All Languages</option>
          {LANGUAGE_PAIRS.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.icon} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Level Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Level
        </label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="input-field"
        >
          <option value="all">All Levels</option>
          {LANGUAGE_LEVELS.map(level => (
            <option key={level.id} value={level.name}>
              {level.name}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters */}
      {(selectedLanguage !== 'all' || selectedLevel !== 'all') && (
        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedLanguage('all');
              setSelectedLevel('all');
            }}
            className="btn-secondary whitespace-nowrap"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}