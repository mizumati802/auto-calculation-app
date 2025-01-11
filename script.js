let calculatedResult = 0;
let calculatedTimeResult = "0 時間 0 分";

// 初期計算を呼び出す
window.onload = function() {
  calculate();
};

// 計算処理
function calculate() {
  const num2 = parseFloat(document.getElementById('num2').value) || 0;  // 送料
  const num4 = parseFloat(document.getElementById('num4').value) || 0;  // 仕入額
  const num3 = parseFloat(document.getElementById('num3').value) || 4000;  // 見込み利益
  const percentage = parseFloat(document.getElementById('percentage').value) || 0;  // セールのパーセンテージ
  const status = parseFloat(document.getElementById('status').value) || 0; // 状態・手間賃
  const num1 = parseFloat(document.getElementById('num1').value) || 0; // 発送費用

  // 状態分を見込み利益から直接引く
  const adjustedProfit = num3 - status;

  // 発送費用を引く
  const afterShippingCost = adjustedProfit - num1;

  // さらに10%を引く前に500を引く
  const reducedProfit = afterShippingCost - 500;

  // さらに10%を差し引く
  const finalAdjustedProfit = reducedProfit * 0.9;

  // 仕入額から割引を適用
  const discountedCost = num4 * (1 - (percentage / 100));  // 割引後の仕入額

  // 最終利益計算
  calculatedResult = Math.ceil(finalAdjustedProfit - discountedCost - num2);

  // 結果表示
  document.getElementById('result').innerText = calculatedResult + " 円";  // 計算結果の表示

  // 時給単価1000円で換算して、必要な作業時間を計算
  const hourlyRate = 1000;
  const totalHours = calculatedResult / hourlyRate;  // 結果を1000円で割って時間を計算
  const hours = Math.floor(totalHours);  // 時間部分を切り捨て
  const minutes = Math.round((totalHours - hours) * 60);  // 残りを分に換算
  calculatedTimeResult = `${hours} 時間 ${minutes} 分`;

  // 時間と分を表示
  document.getElementById('timeResult').innerText = calculatedTimeResult;
}

// ローカルストレージに計算結果を保存する処理
function saveToLocalStorage() {
  // ローカルストレージから既存のデータを取得
  let results = JSON.parse(localStorage.getItem('results')) || [];

  // 新しい結果を配列に追加
  results.unshift({ result: calculatedResult, timeResult: calculatedTimeResult });

  // 最大8個に制限
  if (results.length > 8) {
    results.pop();  // 最後の要素を削除
  }

  // ローカルストレージに保存
  localStorage.setItem('results', JSON.stringify(results));

  // 「送信完了」のメッセージを表示
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.style.display = 'block';

  // 2秒後にメッセージを非表示にする
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 2000);
}
