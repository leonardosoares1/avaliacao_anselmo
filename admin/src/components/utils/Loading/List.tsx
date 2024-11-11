interface IProps {
  rows?: number;
  show: boolean;
}

const ComponentLoadingList = ({ rows = 5, show }: IProps) => {
  const loadingItems = new Array(rows);

  for (let i = 0; i < loadingItems.length; i += 1) {
    loadingItems[i] = i;
  }

  return (
    show && (
      <div>
        {loadingItems.map((position) => (
          <div
            className={`h-20 w-full animate-shimmer items-center bg-[1000px_100%] odd:bg-[linear-gradient(to_right,transparent_4%,#fafafa_25%,transparent_36%)] even:bg-[linear-gradient(to_right,#e2e2e2_25%,#eff1f3_36%,transparent_36%)]`}
            key={position}
          />
        ))}
      </div>
    )
  );
};

export default ComponentLoadingList;
