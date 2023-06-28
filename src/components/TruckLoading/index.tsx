import { useLottie } from "lottie-react";
import truck from "../../../public/truck.json";
import { Typography } from "@mui/material";

const style = {
  height: 500,
};

const TruckLoading = () => {
  const options = {
    animationData: truck,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default function TruckAnimation() {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col mb-10">
      <TruckLoading />
      <Typography sx={{ marginTop: "-40px" }} color={"white"}>
        {" "}
        Carregando...
      </Typography>
    </div>
  );
}
