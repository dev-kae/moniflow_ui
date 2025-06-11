export const TabsPerfil = ({ tab, setTab }) => (
  <div className="flex gap-4 border-b mb-4">
    {['info', 'plano', 'APIs'].map(tabValue => (
      <button
        key={tabValue}
        onClick={() => setTab(tabValue)}
        className={`cursor-pointer px-4 py-2 border-b-2 transition-colors ${tab === tabValue ? 'border-[#FA565F] text-black dark:text-white' : 'border-transparent text-black dark:text-white hover:text-[#FA565F] hover:border-[#FA565F]'}`}
      >
        {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
      </button>
    ))}
  </div>
);