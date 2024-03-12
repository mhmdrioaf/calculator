import { useContext } from "react";
import { Body, Button, Container, Total } from ".";
import {
  CalculatorContext,
  TCalculatorContext,
} from "../lib/hooks/calculatorContext";

export default function Calculator() {
  const { handler, state } = useContext(
    CalculatorContext
  ) as TCalculatorContext;

  const buttons = [
    [
      {
        value: "7",
        key: "seven",
      },
      {
        value: "8",
        key: "eight",
      },
      {
        value: "9",
        key: "nine",
      },
    ],
    [
      {
        value: "4",
        key: "four",
      },
      {
        value: "5",
        key: "five",
      },
      {
        value: "6",
        key: "six",
      },
    ],
    [
      {
        value: "1",
        key: "one",
      },
      {
        value: "2",
        key: "two",
      },
      {
        value: "3",
        key: "three",
      },
    ],
    [
      {
        value: "0",
        key: "zero",
      },
      {
        value: ".",
        key: "decimal",
      },
    ],
  ];

  return (
    <div className="w-1/3 flex flex-col gap-4">
      <p className="text-2xl text-primary font-bold text-center">Calculator</p>

      <Container>
        <Total overall={state.overall} total={state.total} />
        <Body>
          <div className="col-span-3 grid grid-cols-3 gap-1">
            <Button
              id="clear"
              variant="clear"
              className="col-span-2"
              onClick={handler.clear}
            >
              <p>AC</p>
            </Button>
            <Button
              variant="action"
              onClick={() => handler.actionClick("/")}
              id="divide"
            >
              <p>/</p>
            </Button>

            {buttons.map((button) =>
              button.map((btn) => (
                <Button
                  key={btn.key}
                  variant="default"
                  id={btn.key}
                  onClick={() => handler.numberClick(btn.value)}
                  className={btn.value === "0" ? "col-span-2" : "col-span-1"}
                >
                  <p>{btn.value}</p>
                </Button>
              ))
            )}
          </div>

          <div className="col-span-1 grid grid-rows-5 gap-2">
            <Button
              variant="action"
              onClick={() => handler.actionClick("*")}
              id="multiply"
            >
              <p>x</p>
            </Button>
            <Button
              variant="action"
              onClick={() => handler.actionClick("-")}
              id="subtract"
            >
              <p>-</p>
            </Button>
            <Button
              variant="action"
              onClick={() => handler.actionClick("+")}
              id="add"
            >
              <p>+</p>
            </Button>
            <Button
              variant="sum"
              className="row-span-2"
              onClick={handler.sum}
              id="equals"
            >
              <p>=</p>
            </Button>
          </div>
        </Body>
      </Container>
    </div>
  );
}
