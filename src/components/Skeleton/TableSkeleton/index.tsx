import { Skeleton } from "@mui/material";

const TableSkeleton = () => {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rectangular"
      width={210}
      height={118}
    />
  );
};

export default TableSkeleton;
