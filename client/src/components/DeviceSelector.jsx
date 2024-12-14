function DeviceSelector({ devices, onDeviceChange, isVisible, toggleVisibility, theme }) {
    return (
      <div className={`bg-slate-500 rounded-full gap-3 w-auto ${theme}`}>
        <button onClick={toggleVisibility}>
          <span className="material-symbols-rounded ml-1">keyboard_arrow_up</span>
        </button>
        {isVisible && (
          <select
            className={`${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
            } rounded-md`}
            onChange={onDeviceChange}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || "Unknown Device"}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
  export default DeviceSelector;