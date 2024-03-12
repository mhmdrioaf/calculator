import React from "react";
import { create, all } from "mathjs";

export type TCalculatorContext = {
  state: {
    overall: string | null;
    total: string | null;
  };
  handler: {
    numberClick: (value: string) => void;
    actionClick: (actions: "/" | "*" | "+" | "-") => void;
    clear: () => void;
    sum: () => void;
  };
};

export const CalculatorContext = React.createContext<TCalculatorContext | null>(
  null
);

export function CalculatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isResult, setIsResult] = React.useState<boolean>(false);
  const [overall, setOverall] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState<string | null>(null);
  const math = create(all);

  const onNumberClick = (value: string) => {
    const actions = ["/", "*", "+", "-"];

    if (isResult) {
      setTotal(value);
      setOverall(value);
      setIsResult(false);
      return;
    }

    if (value !== ".") {
      const isZeroAtLast = (current: string | null) => {
        if (current) {
          const isOperator = actions.includes(current.slice(-3).trim());
          const isZero = value === "0";

          return isOperator && isZero;
        } else {
          return false;
        }
      };
      setOverall((prev) =>
        prev ? (isZeroAtLast(prev) ? prev : `${prev}${value}`) : value
      );
      setTotal((prev) =>
        prev && prev !== "0" && !actions.includes(prev)
          ? `${prev}${value}`
          : value
      );
    } else {
      const isBeforeDot = overall?.slice(-1) === undefined ?? true;

      if (total?.indexOf(".") === -1) {
        setTotal((prev) => `${prev}${value}`);
        if (isBeforeDot) {
          setOverall((prev) => (prev ? `${prev}${value}` : `0${value}`));
        } else {
          setOverall((prev) => (prev ? `${prev}${value}` : value));
        }
      }
    }
  };

  const onActionClick = (action: "/" | "*" | "+" | "-") => {
    if (isResult) {
      setOverall(total + ` ${action} `);
      setTotal(action);
      setIsResult(false);
      return;
    }

    if (overall) {
      let newOverall = overall + ` ${action} `;
      const lastChar = overall[overall.length - 2];

      if (action === lastChar) {
        return;
      }

      if (action !== "-" && lastChar === "-" && isNaN(Number(lastChar))) {
        const temp = newOverall.replace(/[+*/-]/g, "");
        newOverall = temp + ` ${action} `;
      }

      if (action !== "-" && lastChar !== "-" && isNaN(Number(lastChar))) {
        const temp = newOverall.replace(/[+*/-]/g, "");
        newOverall = temp + ` ${action} `;
      }
      setOverall(newOverall);
      setTotal(action);
    }
  };

  const clearCalculator = () => {
    setTotal(null);
    setOverall(null);
    setIsResult(false);
  };

  const onSum = () => {
    const actions = ["/", "*", "+", "-"];
    if (overall && !isResult) {
      const lastChar = overall[overall.length - 2];
      let newOverall = overall;
      if (actions.includes(lastChar)) {
        newOverall = newOverall.slice(0, -3);
      }
      const result = math.evaluate(newOverall);
      setTotal(result.toString());
      setOverall(newOverall + " = " + result.toString());
      setIsResult(true);
    }
  };

  const value: TCalculatorContext = {
    state: {
      overall,
      total,
    },
    handler: {
      numberClick: onNumberClick,
      actionClick: onActionClick,
      clear: clearCalculator,
      sum: onSum,
    },
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}
