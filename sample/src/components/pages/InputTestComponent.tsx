import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputTestComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [text, setText] = useState({ datepicker: "", textinput: "" });
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // 日本時間の yyyy-MM-dd フォーマットで日付を取得する関数
  const formatToJST = (date: Date): string => {
    const japanOffset = 9 * 60; // 日本のタイムゾーン (UTC +9)
    const localDate = new Date(date.getTime() + japanOffset * 60 * 1000);
    return localDate.toISOString().split("T")[0]; // "yyyy-MM-dd" の形式で返す
  };

  // text が変更された後に確認するための useEffect
  useEffect(() => {
    console.log("Updated text:", text);
  }, [text]);

  const handleChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      if (typeof event.target.dataset.key !== "string") {
        return;
      }
      const dataKey: string = event.target.dataset.key;
      console.log("input changed:", event.target.value);

      // setTextを関数型で呼び出して最新の状態を基に更新
      setText((prevText) => {
        const newText = { ...prevText };
        newText[dataKey] = event.target.value;
        console.log(newText);
        return newText;
      });
    }
  };

  const handleDateChange = (date: Date) => {
    const formattedDate = formatToJST(date); // 日本時間でフォーマット

    // 日付が更新されたら他の入力フィールドをリセット
    setText((prevText) => ({
      ...prevText,
      datepicker: formattedDate, // datepicker のみ更新
      textinput: "", // textinput はリセット
    }));

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = formattedDate; // hidden input に日付をセット

      // 手動で React.ChangeEvent を作成し、handleChange を呼び出す
      const event = {
        target: hiddenInputRef.current,
      } as React.ChangeEvent<HTMLInputElement>; // 型を指定
      handleChange(event); // これで handleChange が呼ばれ、hidden input の変更が処理される
    }

    setSelectedDate(date); // selectedDate を更新
  };

  return (
    <div>
      {/* DatePicker (カスタム input は使わず、hidden の input に値をセット) */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange} // 日付選択時に handleDateChange を呼び出し
        icon={null}
      />
      {/* 見えない input */}
      <input
        type="text"
        ref={hiddenInputRef}
        data-key="datepicker"
        value={text.datepicker}
        style={{ display: "none" }} // 見えないように設定
        onChange={handleChange}
      />

      {/* 通常の input */}
      <input
        type="text"
        data-key="textinput"
        value={text.textinput}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputTestComponent;
