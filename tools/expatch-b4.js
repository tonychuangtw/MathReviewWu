/* 例題難度補丁 — 第四冊（u37–u48）。手工撰寫。 */
module.exports = {
  u37c1: { tags: ['中'], add: [
    { d: '易', q: '把 $\\dfrac{2}{9}$ 化成循環小數。',
      steps: ['$2\\div 9=0.222\\ldots$。'], ans: '$0.\\overline{2}$' },
    { d: '難', q: '把 $0.2\\overline{7}$ 化成最簡分數。',
      steps: ['一位不循環一位循環：$\\dfrac{27-2}{90}$。', '$=\\dfrac{25}{90}=\\dfrac{5}{18}$。'], ans: '$\\dfrac{5}{18}$' } ] },
  u37c2: { tags: ['易'], add: [
    { d: '中', q: '數列 1, 1, 2, 3, 5, 8, 13⋯ 是什麼數列？下一項是多少？',
      steps: ['每項＝前兩項之和 → 費氏數列。', '$8+13=21$。'], ans: '費氏數列；21' },
    { d: '難', q: '數列 $\\dfrac{1}{2},\\dfrac{1}{5},\\dfrac{1}{8},\\dfrac{1}{11}\\cdots$ 是調和數列嗎？為什麼？',
      steps: ['取倒數：2, 5, 8, 11⋯。', '倒數成等差（公差 3）→ 是調和數列。'], ans: '是（倒數後成 AP）' } ] },
  u37c3: { tags: ['易'], add: [
    { d: '中', q: '等差數列第 3 項為 11、第 4 項為 15，求公差與首項。',
      steps: ['$d=15-11=4$。', '$a_1=a_3-2d=11-8=3$。'], ans: '$d=4$、$a_1=3$' },
    { d: '難', q: '三數 $x-2$、$x+1$、$3x-5$ 成等差數列，求 $x$ 與這三個數。',
      steps: ['等差 → 中間項的 2 倍＝前後之和：$2(x+1)=(x-2)+(3x-5)$。', '$2x+2=4x-7$ → $x=\\dfrac{9}{2}$。', '三數：$\\dfrac{5}{2}$、$\\dfrac{11}{2}$、$\\dfrac{17}{2}$（公差 3 ✓）。'], ans: '$x=\\dfrac{9}{2}$；$\\dfrac{5}{2},\\dfrac{11}{2},\\dfrac{17}{2}$' } ] },
  u37c4: { tags: ['易', '中'], add: [
    { d: '難', q: '等差數列 $a_3=10$、$a_8=25$，求首項、公差與第 100 項。',
      steps: ['$a_8-a_3=5d=15$ → $d=3$。', '$a_1=a_3-2d=4$。', '$a_{100}=4+99\\times 3=301$。'], ans: '$a_1=4$、$d=3$、$a_{100}=301$' } ] },
  u37c5: { tags: ['易', '中'], add: [
    { d: '難', q: '三正數 $a$、12、$b$ 成等差數列，且 $a\\times b=80$，$a<b$，求 $a$、$b$。',
      steps: ['等差中項：$a+b=24$。', '和 24、積 80 → 解 $t^2-24t+80=0$ → $t=4$ 或 20。', '$a<b$ → $a=4$、$b=20$。'], ans: '$a=4$、$b=20$' } ] },
  u38c1: { tags: ['中'], add: [
    { d: '易', q: '「數列」和「級數」有什麼不同？$1,3,5,7$ 的級數是多少？',
      steps: ['數列是排一列；級數是把各項相加。', '$1+3+5+7=16$。'], ans: '級數＝各項相加；16' },
    { d: '難', q: '仿高斯配對法求 $2+4+6+\\cdots+100$。',
      steps: ['首末配對 $2+100=102$，共 $50\\div 2=25$ 對。', '$102\\times 25=2550$。'], ans: '$2550$' } ] },
  u38c2: { tags: ['易'], add: [
    { d: '中', q: '等差級數 $S_5=45$（前 5 項和），若首項為 5，求第 5 項。',
      steps: ['$S_5=\\dfrac{5(a_1+a_5)}{2}=45$ → $a_1+a_5=18$。', '$a_5=18-5=13$。'], ans: '$a_5=13$' },
    { d: '難', q: '某等差級數 $S_{10}=120$、$S_9=99$，求第 10 項與首項（公差 $d$ 也求出）。',
      steps: ['$a_{10}=S_{10}-S_9=21$。', '$S_{10}=\\dfrac{10(a_1+21)}{2}=120$ → $a_1=3$。', '$21=3+9d$ → $d=2$。'], ans: '$a_{10}=21$、$a_1=3$、$d=2$' } ] },
  u38c3: { tags: ['中', '難'], add: [
    { d: '易', q: '用公式求 $1+2+3+\\cdots+10$。',
      steps: ['$S_{10}=\\dfrac{10(1+10)}{2}$。'], ans: '$55$' } ] },
  u39c1: { tags: ['中'], add: [
    { d: '易', q: '通過 A、B 兩點的直線有幾條？',
      steps: ['兩點決定一條直線。'], ans: '恰 1 條' },
    { d: '難', q: '平面上 4 個點（任三點不共線），最多可決定幾條直線？幾條線段？',
      steps: ['每兩點一條：$\\dfrac{4\\times 3}{2}=6$。', '線段同樣 6 條。'], ans: '直線 6 條；線段 6 條' } ] },
  u39c2: { tags: ['易'], add: [
    { d: '中', q: '時鐘 3 點整，時針與分針的夾角是哪類角？幾度？',
      steps: ['3 點整夾 3 格，每格 $30^\\circ$。', '$90^\\circ$ → 直角。'], ans: '直角（$90^\\circ$）' },
    { d: '難', q: '$\\angle AOB=140^\\circ$，$OC$ 平分 $\\angle AOB$，$\\angle AOC$ 是哪類角？幾度？',
      steps: ['平分：$140\\div 2=70^\\circ$。', '$<90^\\circ$ → 銳角。'], ans: '銳角 $70^\\circ$' } ] },
  u39c3: { tags: ['易', '難'], add: [
    { d: '中', q: '兩角互餘且相等，各是幾度？互補且相等呢？',
      steps: ['互餘：$90\\div 2=45^\\circ$。', '互補：$180\\div 2=90^\\circ$。'], ans: '$45^\\circ$；$90^\\circ$' } ] },
  u39c4: { tags: ['易'], add: [
    { d: '中', q: '兩直線相交成的四個角中，$\\angle 1:\\angle 2=1:2$（相鄰），求四個角。',
      steps: ['相鄰互補：$x+2x=180$ → $x=60$。', '四角：$60^\\circ,120^\\circ,60^\\circ,120^\\circ$（對頂相等）。'], ans: '$60^\\circ$、$120^\\circ$ 各兩個' },
    { d: '難', q: '三條直線交於一點，形成的 6 個角中，已知相間的三個角為 $x$、$2x$、$3x$，求 $x$。',
      steps: ['相間三角合成一個平角：$x+2x+3x=180$。', '$x=30^\\circ$。'], ans: '$30^\\circ$' } ] },
  u39c5: { tags: ['中'], add: [
    { d: '易', q: '四邊形有幾條對角線？',
      steps: ['$\\dfrac{4\\times(4-3)}{2}=2$。'], ans: '2 條' },
    { d: '難', q: '某凸多邊形有 27 條對角線，它是幾邊形？',
      steps: ['$\\dfrac{N(N-3)}{2}=27$ → $N(N-3)=54$。', '$N=9$（$9\\times 6=54$ ✓）。'], ans: '九邊形' } ] },
  u39c6: { tags: ['易', '中'], add: [
    { d: '難', q: '三角形三內角中，最大角是最小角的 3 倍，中間角 $60^\\circ$，求三內角。',
      steps: ['設最小 $x$：$x+3x+60=180$。', '$x=30$ → 三角 $30^\\circ,60^\\circ,90^\\circ$。'], ans: '$30^\\circ$、$60^\\circ$、$90^\\circ$' } ] },
  u39c7: { tags: ['易', '中'], add: [
    { d: '難', q: '等腰三角形一個內角是 $100^\\circ$，求另外兩角；若一個內角是 $80^\\circ$ 呢（有幾種情形）？',
      steps: ['$100^\\circ$ 必為頂角（底角×2 不能 ≥180）：底角各 $40^\\circ$。', '$80^\\circ$ 可為頂角（底角 $50^\\circ$）或底角（$80,80,20$）。'], ans: '$40^\\circ,40^\\circ$；兩種：$50,50$ 或 $80,20$' } ] },
  u39c8: { tags: ['易', '中'], add: [
    { d: '難', q: '平行四邊形 $ABCD$ 周長 36，$\\overline{AB}$ 比 $\\overline{BC}$ 長 4，求各邊長。',
      steps: ['$2(\\overline{AB}+\\overline{BC})=36$ → 和為 18。', '$\\overline{AB}=11$、$\\overline{BC}=7$。', '對邊相等 → 四邊 11、7、11、7。'], ans: '11、7、11、7' } ] },
  u39c9: { tags: ['中', '易'], add: [
    { d: '難', q: '菱形邊長 5、一條對角線長 6，求另一條對角線與面積。',
      steps: ['對角線互相垂直平分：半邊 3，邊 5 → 另一半對角線 $=\\sqrt{25-9}=4$。', '另一對角線 $=8$；面積 $=\\dfrac{6\\times 8}{2}=24$。'], ans: '8；面積 24' } ] },
  u39c10: { tags: ['中', '難'], add: [
    { d: '易', q: '六邊形的內角和是多少？',
      steps: ['$(6-2)\\times 180^\\circ$。'], ans: '$720^\\circ$' } ] },
  u39c11: { tags: ['中', '易'], add: [
    { d: '難', q: '半徑 9 的圓中，一扇形面積為 $27\\pi$，求圓心角與弧長。',
      steps: ['$81\\pi\\times\\dfrac{x}{360}=27\\pi$ → $x=120^\\circ$。', '弧長 $=18\\pi\\times\\dfrac{120}{360}=6\\pi$。'], ans: '$120^\\circ$；$6\\pi$' } ] },
  u40c1: { tags: ['中'], add: [
    { d: '易', q: '$L_1\\perp L_2$ 的符號讀作什麼？交點稱為什麼？',
      steps: ['讀作 $L_1$ 垂直於 $L_2$。', '交點稱為垂足。'], ans: '垂直；垂足' },
    { d: '難', q: '$A$ 到直線 $L$ 的垂足為 $B$，$\\overline{AB}=6$；$C$ 是 $L$ 上另一點且 $\\overline{BC}=8$，求 $\\overline{AC}$ 及 $A$ 到 $L$ 的距離。',
      steps: ['$\\overline{AB}\\perp L$ → $\\triangle ABC$ 直角。', '$\\overline{AC}=\\sqrt{36+64}=10$。', '距離＝垂直線段 $\\overline{AB}=6$（$\\overline{AC}=10$ 不是距離）。'], ans: '$\\overline{AC}=10$；距離 6' } ] },
  u40c2: { tags: ['中'], add: [
    { d: '易', q: '$M$ 平分 $\\overline{AB}$，$\\overline{AB}=18$，求 $\\overline{AM}$。',
      steps: ['中點把線段分成相等兩段。'], ans: '$9$' },
    { d: '難', q: '$M$ 為 $\\overline{AB}$ 中點，$\\overline{AM}=2x+3$、$\\overline{MB}=3x-2$，求 $\\overline{AB}$。',
      steps: ['$2x+3=3x-2$ → $x=5$。', '$\\overline{AM}=13$ → $\\overline{AB}=26$。'], ans: '$26$' } ] },
  u40c3: { tags: ['易', '中'], add: [
    { d: '難', q: '$\\triangle ABC$ 中，$\\overline{AB}$ 與 $\\overline{AC}$ 的中垂線交於 $O$。說明 $O$ 到三頂點等距。',
      steps: ['$O$ 在 $\\overline{AB}$ 中垂線上 → $\\overline{OA}=\\overline{OB}$。', '$O$ 在 $\\overline{AC}$ 中垂線上 → $\\overline{OA}=\\overline{OC}$。', '故 $\\overline{OA}=\\overline{OB}=\\overline{OC}$（這就是外心）。'], ans: '$\\overline{OA}=\\overline{OB}=\\overline{OC}$' } ] },
  u40c4: { tags: ['中', '易'], add: [
    { d: '難', q: '線對稱圖形中，對稱點 $A(2,3)$ 的對稱點為 $A\'(2,-1)$，求對稱軸。',
      steps: ['對稱軸是 $\\overline{AA\'}$ 的垂直平分線。', '$\\overline{AA\'}$ 是鉛直線段，中點 $(2,1)$。', '對稱軸為水平線 $y=1$。'], ans: '$y=1$' } ] },
  u41c1: { tags: ['易'], add: [
    { d: '中', q: '尺規作圖中，圓規和直尺各只能做什麼？',
      steps: ['圓規只拿來畫弧（含轉移長度）。', '直尺只用來畫直線，不可用刻度。'], ans: '畫弧；畫直線' },
    { d: '難', q: '只用尺規，如何作出長度為已知線段 $\\overline{AB}$ 的 3 倍的線段？',
      steps: ['畫一條射線，用圓規量取 $\\overline{AB}$。', '在射線上連續截取 3 次，端點相接。'], ans: '同一射線上連續截 3 段 $\\overline{AB}$' } ] },
  u41c2: { tags: ['難'], add: [
    { d: '易', q: '要把一個角分成兩個相等的角，用哪種基本作圖？',
      steps: ['角平分線作圖。'], ans: '角平分線作圖' },
    { d: '中', q: '簡述「垂直平分線作圖」的步驟。',
      steps: ['以 $A$、$B$ 為圓心，大於 $\\dfrac{1}{2}\\overline{AB}$ 的等半徑各畫弧。', '兩弧交於兩點，連接此兩點即為中垂線。'], ans: '兩端點畫等弧、連兩交點' } ] },
  u42c1: { tags: ['中'], add: [
    { d: '易', q: '三角形兩內角為 $90^\\circ$、$35^\\circ$，求第三角。',
      steps: ['$180-90-35$。'], ans: '$55^\\circ$' },
    { d: '難', q: '$\\triangle ABC$ 中 $\\angle A=x+10^\\circ$、$\\angle B=2x$、$\\angle C=3x-40^\\circ$，求最大內角。',
      steps: ['$x+10+2x+3x-40=180$ → $6x=210$ → $x=35$。', '三角：$45^\\circ,70^\\circ,65^\\circ$ → 最大 $70^\\circ$。'], ans: '$70^\\circ$' } ] },
  u42c2: { tags: ['易'], add: [
    { d: '中', q: '三角形一外角為 $120^\\circ$，兩遠內角比為 $1:2$，求較大的遠內角。',
      steps: ['外角＝兩遠內角之和 $=120^\\circ$。', '$r+2r=120$ → $r=40$，較大者 $80^\\circ$。'], ans: '$80^\\circ$' },
    { d: '難', q: '$\\triangle ABC$ 中，$\\angle B$ 的外角 $=125^\\circ$、$\\angle C$ 的外角 $=100^\\circ$，求 $\\angle A$。',
      steps: ['$\\angle B=55^\\circ$、$\\angle C=80^\\circ$。', '$\\angle A=180-55-80=45^\\circ$。'], ans: '$45^\\circ$' } ] },
  u42c3: { tags: ['易', '中'], add: [
    { d: '難', q: '一個凸多邊形去掉一個內角後，其餘內角和為 $1000^\\circ$，求它是幾邊形與被去掉的內角。',
      steps: ['內角和 $=(n-2)\\times 180\\ge 1000$ 且去掉的角 $<180$。', '$(n-2)\\times 180=1080$（最接近且 $>1000$）→ $n=8$。', '去掉的角 $=1080-1000=80^\\circ$。'], ans: '八邊形；$80^\\circ$' } ] },
  u42c4: { tags: ['易'], add: [
    { d: '中', q: '正十邊形每個外角幾度？每個內角幾度？',
      steps: ['外角 $=360\\div 10=36^\\circ$。', '內角 $=180-36=144^\\circ$。'], ans: '$36^\\circ$；$144^\\circ$' },
    { d: '難', q: '某正多邊形的每個內角是每個外角的 4 倍，它是正幾邊形？',
      steps: ['內角＋外角 $=180$，內角 $=4\\times$ 外角 → 外角 $=36^\\circ$。', '$n=360\\div 36=10$。'], ans: '正十邊形' } ] },
  u43c1: { tags: ['易'], add: [
    { d: '中', q: '$\\triangle ABC\\cong\\triangle DEF$，寫出三組對應邊與三組對應角。',
      steps: ['照字母順序對應：$A\\leftrightarrow D$、$B\\leftrightarrow E$、$C\\leftrightarrow F$。', '邊 $\\overline{AB}=\\overline{DE}$、$\\overline{BC}=\\overline{EF}$、$\\overline{AC}=\\overline{DF}$；角同理。'], ans: '如步驟' },
    { d: '難', q: '$\\triangle ABC\\cong\\triangle DEF$，$\\angle A=50^\\circ$、$\\angle E=60^\\circ$，求 $\\angle F$。',
      steps: ['$\\angle D=\\angle A=50^\\circ$、$\\angle B=\\angle E=60^\\circ$。', '$\\angle F=180-50-60=70^\\circ$。'], ans: '$70^\\circ$' } ] },
  u43c2: { tags: ['易', '難'], add: [
    { d: '中', q: '$\\overline{AB}=\\overline{AD}$、$\\overline{BC}=\\overline{DC}$，$\\overline{AC}$ 為共用邊。$\\triangle ABC$ 與 $\\triangle ADC$ 全等嗎？依據？',
      steps: ['三組對應邊相等（含共用邊）。', 'SSS 全等。'], ans: '全等（SSS）' } ] },
  u43c3: { tags: ['中'], add: [
    { d: '易', q: 'ASA 全等的三個條件是什麼？',
      steps: ['兩角與其「夾邊」對應相等。'], ans: '角、夾邊、角' },
    { d: '難', q: '$O$ 為 $\\overline{AC}$、$\\overline{BD}$ 的交點且互相平分。用 SAS 說明 $\\triangle AOB\\cong\\triangle COD$。',
      steps: ['$\\overline{OA}=\\overline{OC}$、$\\overline{OB}=\\overline{OD}$（互相平分）。', '$\\angle AOB=\\angle COD$（對頂角）為夾角。', 'SAS 全等。'], ans: '兩邊夾對頂角 → SAS' } ] },
  u43c4: { tags: ['中'], add: [
    { d: '易', q: 'AAS 與 ASA 差在哪裡？',
      steps: ['ASA 的邊是兩角的夾邊。', 'AAS 的邊不是夾邊（但可由內角和轉成 ASA）。'], ans: '邊是否為夾邊' },
    { d: '難', q: '兩三角形中 $\\angle A=\\angle D=40^\\circ$、$\\overline{AB}=\\overline{DE}=7$、$\\overline{BC}=\\overline{EF}=5$（角非夾角）。這兩個三角形一定全等嗎？',
      steps: ['條件是 SSA（角不夾在兩邊間）。', 'SSA 不保證全等（$\\angle C$ 與 $\\angle F$ 可能相等或互補）。'], ans: '不一定（SSA）' } ] },
  u44c1: { tags: ['難'], add: [
    { d: '易', q: '$C$ 在 $\\overline{AB}$ 的中垂線上，$\\overline{CA}=9$，求 $\\overline{CB}$。',
      steps: ['中垂線上的點到兩端等距。'], ans: '$9$' },
    { d: '中', q: '$\\overline{PA}=\\overline{PB}$，能不能斷定 $P$ 在 $\\overline{AB}$ 的中垂線上？依據？',
      steps: ['到兩端點等距 → 在中垂線上。', '這是垂直平分線的「判別」。'], ans: '可以（中垂線判別）' } ] },
  u44c2: { tags: ['中'], add: [
    { d: '易', q: '$P$ 在 $\\angle ABC$ 的角平分線上，到邊 $\\overrightarrow{BA}$ 的距離為 4，求到 $\\overrightarrow{BC}$ 的距離。',
      steps: ['角平分線上的點到兩邊等距。'], ans: '$4$' },
    { d: '難', q: '$D$ 在 $\\angle B$ 內部，到 $\\angle B$ 兩邊的垂直距離都是 6。$D$ 一定在哪條線上？畫輔助線說明用到哪兩個直角三角形全等？',
      steps: ['到兩邊等距 → 角平分線判別 → $D$ 在 $\\angle B$ 的角平分線上。', '證明用 $\\triangle$（$B$、$D$、兩垂足）成 RHS 全等（共用 $\\overline{BD}$、兩距離相等、直角）。'], ans: '$\\angle B$ 的角平分線上；RHS' } ] },
  u44c3: { tags: ['易'], add: [
    { d: '中', q: '等腰 $\\triangle ABC$ 中 $\\overline{AB}=\\overline{AC}$，$D$ 為 $\\overline{BC}$ 中點。$\\overline{AD}$ 與 $\\overline{BC}$ 有什麼關係？',
      steps: ['頂角平分線、底邊中線、底邊中垂線三線合一。', '$\\overline{AD}\\perp\\overline{BC}$ 且平分 $\\angle A$。'], ans: '垂直平分（三線合一）' },
    { d: '難', q: '等腰三角形兩腰 10、底邊 12，求底邊上的高與面積。',
      steps: ['高垂直平分底邊 → 半底 6。', '高 $=\\sqrt{10^2-6^2}=8$。', '面積 $=\\dfrac{12\\times 8}{2}=48$。'], ans: '高 8；面積 48' } ] },
  u44c4: { tags: ['易', '中'], add: [
    { d: '難', q: '三邊為 $n$、$n+1$、$n+2$ 的三角形是直角三角形，求 $n$。',
      steps: ['最長邊 $n+2$：$n^2+(n+1)^2=(n+2)^2$。', '$n^2-2n-3=0$ → $(n-3)(n+1)=0$。', '$n=3$（邊長 3、4、5）。'], ans: '$n=3$' } ] },
  u45c1: { tags: ['中', '易'], add: [
    { d: '難', q: '等腰三角形兩邊長 4 與 9，求周長。',
      steps: ['腰是 4：$4+4=8<9$ 不成三角形 ✗。', '腰是 9：$9+9>4$ ✓ → 邊 9、9、4。', '周長 22。'], ans: '$22$' } ] },
  u45c2: { tags: ['中'], add: [
    { d: '易', q: '外角定理說三角形的外角等於什麼？外角和遠內角誰大？',
      steps: ['外角＝兩遠內角之和。', '所以外角大於任一遠內角。'], ans: '兩遠內角和；外角大' },
    { d: '難', q: '$\\triangle ABC$ 中 $D$ 在 $\\overline{BC}$ 延長線上。若 $\\angle ACD=130^\\circ$、$\\angle B=68^\\circ$，比較 $\\angle A$ 與 $\\angle B$ 的大小。',
      steps: ['外角定理：$\\angle A=130-68=62^\\circ$。', '$62<68$ → $\\angle A<\\angle B$。'], ans: '$\\angle A=62^\\circ<\\angle B$' } ] },
  u45c3: { tags: ['易', '中'], add: [
    { d: '難', q: '$\\triangle ABC$ 中 $\\angle A:\\angle B:\\angle C=3:4:5$，判斷最長邊與最短邊。',
      steps: ['角：$45^\\circ,60^\\circ,75^\\circ$。', '大角對大邊：最長邊對 $\\angle C$ 即 $\\overline{AB}$；最短邊 $\\overline{BC}$。'], ans: '最長 $\\overline{AB}$、最短 $\\overline{BC}$' } ] },
  u45c4: { tags: ['中'], add: [
    { d: '易', q: '兩三角形兩組邊對應相等，夾角一個 $50^\\circ$、一個 $70^\\circ$，哪個三角形的第三邊較長？',
      steps: ['樞紐定理：夾角大 → 對邊長。'], ans: '$70^\\circ$ 那個' },
    { d: '難', q: '$\\triangle ABC$ 與 $\\triangle ABD$ 共用 $\\overline{AB}$，$\\overline{AC}=\\overline{AD}$。若 $\\overline{BC}>\\overline{BD}$，比較 $\\angle BAC$ 與 $\\angle BAD$。',
      steps: ['兩組邊相等（$\\overline{AB}$ 共用、$\\overline{AC}=\\overline{AD}$）。', '逆樞紐：對邊大 → 夾角大。'], ans: '$\\angle BAC>\\angle BAD$' } ] },
  u45c5: { tags: ['易', '中'], add: [
    { d: '難', q: '正三角形邊長 8，求高；再求以此高為股、$45^\\circ$ 底角的等腰直角三角形斜邊。',
      steps: ['高 $=\\dfrac{\\sqrt{3}}{2}\\times 8=4\\sqrt{3}$。', '等腰直角：斜邊 $=$ 股 $\\times\\sqrt{2}=4\\sqrt{6}$。'], ans: '高 $4\\sqrt{3}$；斜邊 $4\\sqrt{6}$' } ] },
  u46c1: { tags: ['易'], add: [
    { d: '中', q: '$L_1\\parallel L_2$、$L_2\\parallel L_3$，$L_1$ 與 $L_3$ 什麼關係？$M\\perp L_1$ 呢？',
      steps: ['平行遞移：$L_1\\parallel L_3$。', '$M\\perp L_1$ 且 $L_1\\parallel L_2$ → $M\\perp L_2$。'], ans: '$L_1\\parallel L_3$；$M\\perp L_2$' },
    { d: '難', q: '判斷正誤：「兩直線沒有共同垂線，則兩直線不平行」。',
      steps: ['平行的意義：可以找到共同垂線。', '沒有共同垂線 → 不符合平行意義 → 敘述正確。'], ans: '正確' } ] },
  u46c2: { tags: ['易'], add: [
    { d: '中', q: '截線圖中 $\\angle 3$ 與 $\\angle 5$ 是哪種角？$\\angle 2$ 與 $\\angle 7$ 呢？',
      steps: ['$\\angle 3,\\angle 5$ 在兩線之內同側 → 同側內角。', '$\\angle 2,\\angle 7$ 在兩線之外交錯 → 外錯角。'], ans: '同側內角；外錯角' },
    { d: '難', q: '兩直線被一截線所截共形成 8 個角，同位角、內錯角、同側內角、外錯角、同側外角共有幾「組」？',
      steps: ['同位角 4 組。', '內錯角 2＋同側內角 2＋外錯角 2＋同側外角 2。'], ans: '共 12 組' } ] },
  u46c3: { tags: ['中', '易'], add: [
    { d: '難', q: '$L_1\\parallel L_2$，截線與 $L_1$ 交角處的四個角中最小角為 $52^\\circ$。求截線與 $L_2$ 所成的鈍角。',
      steps: ['$L_1$ 處角：$52^\\circ$ 與 $128^\\circ$。', '同位角相等 → $L_2$ 處也一樣。', '鈍角 $=128^\\circ$。'], ans: '$128^\\circ$' } ] },
  u46c4: { tags: ['易'], add: [
    { d: '中', q: '截兩直線的同側內角為 $95^\\circ$ 與 $85^\\circ$，兩直線平行嗎？',
      steps: ['$95+85=180$ 互補。', '同側內角互補 → 平行。'], ans: '平行' },
    { d: '難', q: '同位角 $110^\\circ$ 與 $105^\\circ$，兩直線會在哪一側相交？（截線同側角小的那邊？說明）',
      steps: ['同位角不相等 → 不平行，必相交。', '兩線在同側內角和 $<180^\\circ$ 的那一側相交（角小代表往那邊收攏）。'], ans: '不平行；朝內角和較小的一側相交' } ] },
  u47c1: { tags: ['易'], add: [
    { d: '中', q: '平行四邊形 $ABCD$ 中，$\\overline{AD}$ 與哪條邊平行？',
      steps: ['對邊：$\\overline{AD}\\parallel\\overline{BC}$。'], ans: '$\\overline{BC}$' },
    { d: '難', q: '四邊形 $ABCD$ 中 $\\angle A+\\angle B=180^\\circ$。能推得哪兩邊平行？它一定是平行四邊形嗎？',
      steps: ['同側內角互補 → $\\overline{AD}\\parallel\\overline{BC}$。', '只有一雙對邊平行 → 可能是梯形，不一定是平行四邊形。'], ans: '$\\overline{AD}\\parallel\\overline{BC}$；不一定' } ] },
  u47c2: { tags: ['中', '易'], add: [
    { d: '難', q: '平行四邊形 $ABCD$ 對角線交於 $O$，$\\overline{AC}=10$。$P$ 為 $\\overline{AD}$ 上任一點，$\\triangle PAO$ 與 $\\triangle PCO$（皆以 $O$ 相連）面積關係？說明。',
      steps: ['$\\overline{AO}=\\overline{OC}=5$（對角線互相平分）。', '兩三角形以 $\\overline{AO}$、$\\overline{OC}$ 為底、同以 $P$ 到 $\\overline{AC}$ 的距離為高。', '等底同高 → 面積相等。'], ans: '面積相等' } ] },
  u47c3: { tags: ['中', '易'], add: [
    { d: '難', q: '四邊形 $ABCD$ 中 $\\angle A=\\angle C$、$\\angle B=\\angle D$。用內角和說明它是平行四邊形（判別 3 的理由）。',
      steps: ['內角和 $360$：$2\\angle A+2\\angle B=360$ → $\\angle A+\\angle B=180$。', '同側內角互補 → $\\overline{AD}\\parallel\\overline{BC}$；同理另一雙平行。', '兩雙對邊平行 → 平行四邊形。'], ans: '兩組對角相等 ⇒ 平行四邊形' } ] },
  u48c1: { tags: ['中'], add: [
    { d: '易', q: '長方形兩對角線有什麼關係？',
      steps: ['互相平分且等長。'], ans: '互相平分、等長' },
    { d: '難', q: '長方形 $ABCD$ 中 $\\overline{AB}=8$、$\\overline{BC}=6$，對角線交於 $O$，求 $\\triangle OAB$ 的周長。',
      steps: ['對角線 $=\\sqrt{8^2+6^2}=10$ → $\\overline{OA}=\\overline{OB}=5$。', '周長 $=5+5+8=18$。'], ans: '$18$' } ] },
  u48c2: { tags: ['中'], add: [
    { d: '易', q: '菱形的兩條對角線互相成幾度角？',
      steps: ['互相垂直。'], ans: '$90^\\circ$' },
    { d: '難', q: '菱形 $ABCD$ 中 $\\angle A=60^\\circ$、邊長 6，求兩對角線長。',
      steps: ['$\\overline{BD}$ 對 $\\angle A$：$\\triangle ABD$ 為等腰且頂角 $60^\\circ$ → 正三角形 → $\\overline{BD}=6$。', '半對角線：$3$ 與 $\\sqrt{36-9}=3\\sqrt{3}$ → $\\overline{AC}=6\\sqrt{3}$。'], ans: '$6$ 與 $6\\sqrt{3}$' } ] },
  u48c3: { tags: ['中'], add: [
    { d: '易', q: '箏形的哪條對角線會被另一條垂直平分？',
      steps: ['連接兩組等鄰邊交點的那條（對稱軸）垂直平分另一條。'], ans: '非對稱軸的那條被垂直平分' },
    { d: '難', q: '四邊形 $ABCD$ 的對角線 $\\overline{AC}$ 垂直平分 $\\overline{BD}$，但 $\\overline{BD}$ 不平分 $\\overline{AC}$。這是什麼四邊形？若 $\\overline{AC}=12$、$\\overline{BD}=8$，面積？',
      steps: ['一條對角線垂直平分另一條 → 箏形。', '面積 $=\\dfrac{12\\times 8}{2}=48$。'], ans: '箏形；48' } ] },
  u48c4: { tags: ['中'], add: [
    { d: '易', q: '正方形的對角線有哪三個性質？',
      steps: ['互相垂直、互相平分、等長。'], ans: '垂直＋平分＋等長' },
    { d: '難', q: '正方形邊長 $a$，用兩種方式表示面積（邊長式與對角線式），並推出對角線長。',
      steps: ['面積 $=a^2$；對角線 $d$：面積 $=\\dfrac{d^2}{2}$。', '$a^2=\\dfrac{d^2}{2}$ → $d=\\sqrt{2}a$。'], ans: '$d=\\sqrt{2}a$' } ] },
  u48c5: { tags: ['易', '中'], add: [
    { d: '難', q: '梯形中線長 9、高 6，若上底比下底短 8，求上、下底與面積。',
      steps: ['上＋下 $=18$，下－上 $=8$ → 下 13、上 5。', '面積 $=9\\times 6=54$。'], ans: '上底 5、下底 13；面積 54' } ] },
  u48c6: { tags: ['難'], add: [
    { d: '易', q: '正方形是不是平行四邊形？是不是菱形？',
      steps: ['四邊等長、對邊平行 → 都是。'], ans: '都是' },
    { d: '中', q: '「對角線等長的四邊形一定是長方形」對嗎？舉例說明。',
      steps: ['等腰梯形對角線也等長但不是長方形。', '要「等長且互相平分」才是長方形。'], ans: '不對（等腰梯形反例）' } ] },
};
