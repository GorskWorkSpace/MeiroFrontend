import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  placeholder?: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = "Выберите дату",
  selectedDate,
  onDateChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedDate) {
      setInputValue(formatDate(selectedDate));
      setCurrentMonth(selectedDate);
    } else {
      setInputValue("");
    }
  }, [selectedDate]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMonth = (date: Date): string => {
    return date.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];

    for (let i = 0; i < startOffset; i++) {
      days.push({ type: "empty", value: null, key: `empty-${i}` });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const isToday = isSameDay(dayDate, new Date());
      const isSelected = selectedDate
        ? isSameDay(dayDate, selectedDate)
        : false;

      days.push({
        type: "day",
        value: i,
        date: dayDate,
        isToday,
        isSelected,
        key: `day-${i}`,
      });
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateChange(today);
  };

  const handleDateSelect = (date: Date) => {
    onDateChange(date);
  };

  const handleClearDate = () => {
    onDateChange(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      onDateChange(null);
      return;
    }

    const parts = inputValue.split(".");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const parsedDate = new Date(year, month, day);

      if (
        parsedDate.getDate() === day &&
        parsedDate.getMonth() === month &&
        parsedDate.getFullYear() === year
      ) {
        onDateChange(parsedDate);
        setCurrentMonth(parsedDate);
      } else {
        setInputValue(selectedDate ? formatDate(selectedDate) : "");
      }
    } else {
      setInputValue(selectedDate ? formatDate(selectedDate) : "");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
        />
        {selectedDate && (
          <button
            className={styles.clearButton}
            onClick={handleClearDate}
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.calendar}>
        <div className={styles.header}>
          <button onClick={goToPreviousMonth} className={styles.navButton}>
            ←
          </button>
          <span className={styles.monthDisplay}>
            {formatMonth(currentMonth)}
          </span>
          <button onClick={goToNextMonth} className={styles.navButton}>
            →
          </button>
        </div>

        <button onClick={goToToday} className={styles.todayButton}>
          Сегодня
        </button>

        <div className={styles.weekDays}>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {getDaysInMonth(currentMonth).map((day) => {
            if (day.type === "empty") {
              return <div key={day.key} className={styles.emptyDay} />;
            }

            return (
              <div
                key={day.key}
                className={`${styles.day} ${day.isToday ? styles.today : ""} ${
                  day.isSelected ? styles.selected : ""
                }`}
                onClick={() => handleDateSelect(day.date!)}
              >
                {day.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
