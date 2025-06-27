const SummaryStats = () => {
  const statItems = [
    {
      label: "First Stat",
      icon: "",
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Second Stat",
      icon: "",
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Third Stat",
      icon: "",
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Fourth Stat",
      icon: "",
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
  ];
  return (
    <div>
      {statItems.map(({ label, icon: Icon, values }) => (
        <div key={label}>
          <div>
            <Icon />
            <span>{label}</span>
          </div>
          <div>
            <div>
              <span>DTD</span>
              <div>{values.dtd}</div>
            </div>
            <div>
              <span>MTD</span>
              <div>{values.mtd}</div>
            </div>
            <div>
              <span>YTD</span>
              <div>{values.ytd}</div>
            </div>
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default SummaryStats;
