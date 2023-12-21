"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the styles

import { Card, Switch, Text, Title } from "@tremor/react";

export default function Example() {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [startSliderValue, setStartSliderValue] = useState<number>(0);
  const [endSliderValue, setEndSliderValue] = useState<number>(24);

  const handleSwitchChange = (value: boolean) => {
    setIsSwitchOn(value);
  };

  const handleStartSliderChange = (value: number) => {
    setStartSliderValue(value);
  };

  const handleEndSliderChange = (value: number) => {
    setEndSliderValue(value);
  };

  useEffect(() => {
    // You can perform actions based on the switch and slider values here
  }, [isSwitchOn, startSliderValue, endSliderValue]);

  return (
    <Card className="relative max-w-md mx-auto">
      <form action="#" method="post" className="mt-6 grid gap-y-6">
        <div className="flex items-center space-x-3">
          <Switch
            id="switch"
            name="switch"
            checked={isSwitchOn}
            onChange={handleSwitchChange}
          />
          <label htmlFor="switch" className="text-sm text-gray-500">
            Activate Program
          </label>
        </div>

        {/* Start Slider */}
        <div className="flex items-center space-x-3">
          <Text className="text-sm text-gray-500">Start Time:</Text>
          <Slider
            value={startSliderValue}
            max={24}
            onChange={handleStartSliderChange}
          />
          <Text>{startSliderValue}</Text>
        </div>

        {/* End Slider */}
        <div className="flex items-center space-x-3">
          <Text className="text-sm text-gray-500">End Time:</Text>
          <Slider
            value={endSliderValue}
            max={24}
            onChange={handleEndSliderChange}
          />
          <Text>{endSliderValue}</Text>
        </div>
      </form>
    </Card>
  );
}
