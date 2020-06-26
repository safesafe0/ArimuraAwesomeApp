import React,{useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native'
import {Picker} from 'native-base';
import { Transitioning } from 'react-native-reanimated';

function japaneseItem(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateField(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="現代文" value="現代文" />
    <Picker.Item label="古文" value="古文" />
    <Picker.Item label="漢文" value="漢文" />
    </Picker>
  </View>
  );
}
function mathItem(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateField(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="数Ⅰ" value="数Ⅰ" />
    <Picker.Item label="数Ⅱ" value="数Ⅱ" />
    <Picker.Item label="数Ⅲ" value="数Ⅲ" />
    <Picker.Item label="数Ａ" value="数Ａ" />
    <Picker.Item label="数Ｂ" value="数Ｂ" />
    </Picker>
  </View>
  );
}
function englishItem(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateField(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="単語" value="単語" />
    <Picker.Item label="文法" value="文法" />
    <Picker.Item label="読解" value="読解" />
    <Picker.Item label="英作文" value="英作文" />
    </Picker>
  </View>
  );
}
function scienceItem(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateField(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="物理" value="物理" />
    <Picker.Item label="化学" value="化学" />
    <Picker.Item label="生物" value="生物" />
    <Picker.Item label="地学" value="地学" />
    </Picker>
  </View>
  );
}
function socialItem(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateField(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="日本史" value="日本史" />
    <Picker.Item label="世界史" value="世界史" />
    <Picker.Item label="倫理・政経" value="倫理・政経" />
    <Picker.Item label="地理" value="地理" />
    <Picker.Item label="現代社会" value="現代社会" />
    </Picker>
  </View>
  );
}
function gendaibun(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="評論" value="評論" />
    <Picker.Item label="小説" value="小説" />
    <Picker.Item label="随筆" value="随筆" />
    </Picker>
  </View>
  );
}
function kobun(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="単語" value="単語" />
    <Picker.Item label="文法" value="文法" />
    <Picker.Item label="読解" value="読解" />
    </Picker>
  </View>
  );
}
function kanbun(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="単語" value="単語" />
    <Picker.Item label="文法" value="文法" />
    <Picker.Item label="読解" value="読解" />
    </Picker>
  </View>
  );
}
function suu1(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="数と式" value="数と式" />
    <Picker.Item label="集合と論理" value="集合と論理" />
    <Picker.Item label="二次関数" value="二次関数" />
    <Picker.Item label="図形と計量" value="図形と計量" />
    <Picker.Item label="データの分析" value="データの分析" />
    </Picker>
  </View>
  );
}
function suu2(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="方程式・式と証明" value="方程式・式と証明" />
    <Picker.Item label="図形と方程式" value="図形と方程式" />
    <Picker.Item label="三角関数" value="三角関数" />
    <Picker.Item label="指数関数・対数関数" value="指数関数・対数関数" />
    <Picker.Item label="微分と積分" value="微分と積分" />
    </Picker>
  </View>
  );
}
function suu3(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="平面上の曲線" value="平面上の曲線" />
    <Picker.Item label="複素数平面" value="複素数平面" />
    <Picker.Item label="関数と極限" value="関数と極限" />
    <Picker.Item label="微分" value="微分" />
    <Picker.Item label="積分" value="積分" />
    </Picker>
  </View>
  );
}
function suuA(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="場合の数と確率" value="場合の数と確率" />
    <Picker.Item label="整数の性質" value="整数の性質" />
    <Picker.Item label="図形の性質" value="図形の性質" />
    </Picker>
  </View>
  );
}
function suuB(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="数列" value="数列" />
    <Picker.Item label="ベクトル" value="ベクトル" />
    <Picker.Item label="確率分布と統計的な推測" value="確率分布と統計的な推測" />
    </Picker>
  </View>
  );
}
function tango(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="意味" value="意味" />
    <Picker.Item label="発音" value="発音" />
    </Picker>
  </View>
  );
}
function bunpou(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="文型" value="文型" />
    <Picker.Item label="動詞・形容詞・副詞" value="動詞・形容詞・副詞" />
    <Picker.Item label="名詞・冠詞・代名詞" value="名詞・冠詞・代名詞" />
    <Picker.Item label="関係詞・前置詞・接続詞" value="関係詞・前置詞・接続詞" />
    <Picker.Item label="疑問文・命令文" value="疑問文・命令文" />
    <Picker.Item label="仮定法" value="仮定法" />
    <Picker.Item label="助動詞" value="助動詞" />
    <Picker.Item label="受け身" value="受け身" />
    <Picker.Item label="現在分詞・過去分詞" value="現在分詞・過去分詞型" />
    <Picker.Item label="that節・wh節" value="that節・wh節" />
    <Picker.Item label="比較" value="比較" />
    <Picker.Item label="その他" value="その他" />
    </Picker>
  </View>
  );
}
function dokkai(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="英訳" value="英訳" />
    <Picker.Item label="和訳" value="和訳" />
    <Picker.Item label="その他" value="その他" />
    </Picker>
  </View>
  );
}
function eisakubun(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="添削" value="添削" />
    <Picker.Item label="その他" value="その他" />
    </Picker>
  </View>
  );
}
function butsuri(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="力学" value="力学" />
    <Picker.Item label="熱力学" value="熱力学" />
    <Picker.Item label="波動" value="波動" />
    <Picker.Item label="電磁気" value="電磁気" />
    <Picker.Item label="原子" value="原子" />
    </Picker>
  </View>
  );
}
function kagaku(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="理論化学" value="理論化学" />
    <Picker.Item label="無機化学" value="無機化学" />
    <Picker.Item label="有機化学" value="有機化学" />
    </Picker>
  </View>
  );
}
function seibutsu(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="生命現象と物質" value="生命現象と物質" />
    <Picker.Item label="生殖と発生" value="生殖と発生" />
    <Picker.Item label="生物の環境応答" value="生物の環境応答" />
    <Picker.Item label="生態と環境" value="生態と環境" />
    <Picker.Item label="生物の進化と系統" value="生物の進化と系統" />
    </Picker>
  </View>
  );
}
function chigaku(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="個体地球" value="個体地球" />
    <Picker.Item label="岩石・鉱物" value="岩石・鉱物" />
    <Picker.Item label="地質・地史" value="地質・地史" />
    <Picker.Item label="大気・海洋" value="大気・海洋" />
    <Picker.Item label="宇宙" value="宇宙" />
    </Picker>
  </View>
  );
}
function nihonshi(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="指定なし" value="指定なし" />
    <Picker.Item label="近現代" value="近現代" />
    <Picker.Item label="近世" value="近世" />
    <Picker.Item label="中世" value="中世" />
    <Picker.Item label="古代" value="古代" />
    </Picker>
  </View>
  );
}
function sekaishi(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="指定なし" value="指定なし" />
    <Picker.Item label="近現代" value="近現代" />
    <Picker.Item label="近世" value="近世" />
    <Picker.Item label="中世" value="中世" />
    <Picker.Item label="古代" value="古代" />
    </Picker>
  </View>
  );
}
function rinsei(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="倫理" value="倫理" />
    <Picker.Item label="政経" value="政経" />
    </Picker>
  </View>
  );
}
function chiri(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="系統地理" value="系統地理" />
    <Picker.Item label="地誌" value="地誌" />
    </Picker>
  </View>
  );
}
function gensha(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
    <Picker
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateCategory(itemValue)}}>
    <Picker.Item label="未設定" value="未設定" />
    <Picker.Item label="地球環境問題" value="地球環境問題" />
    <Picker.Item label="青年期と自己形成の課題" value="青年期と自己形成の課題" />
    <Picker.Item label="政治分野" value="政治分野" />
    <Picker.Item label="経済分野" value="経済分野" />
    <Picker.Item label="国際政治・経済分野" value="国際政治・経済分野" />
    </Picker>
  </View>
  );
}
export function Subject(props) {
  const [state,setState]=useState('');
  return(
    <View style={styles.picker}>
      <Picker
      style={styles.postInput}
      selectedValue={state}
      onValueChange={(itemValue)=>{setState(itemValue),props.updateSubject(itemValue)}}>
        <Picker.Item label="科目" value="未設定" />
        <Picker.Item label="国語" value="国語" />
        <Picker.Item label="数学" value="数学" />
        <Picker.Item label="英語" value="英語" />
        <Picker.Item label="理科" value="理科" />
        <Picker.Item label="社会" value="社会" />
      </Picker>
    </View>
    );
}
export function Field(props) {
  switch (props.subject) {
    case '国語':
      return japaneseItem(props);
    case '数学':
      return mathItem(props);
    case '英語':
      return englishItem(props);
    case '理科':
      return scienceItem(props);
    case '社会':
      return socialItem(props);
    default:
      return (
        <View style={styles.picker}>
        <Picker
        style={styles.postInput}
        enabled={false}>
          <Picker.Item label="未設定" value="未設定" />
        </Picker>
        </View>
      );
  }
}
export function Category(props) {
  switch (props.subject) {
    case '国語':
      switch (props.field) {
        case '現代文':
          return gendaibun(props);
        case '古文':
          return kobun(props);
        case '漢文':
          return kanbun(props);
        default:
          return (
            <View style={styles.picker}>
            <Picker
            style={styles.postInput}
            enabled={false}>
              <Picker.Item label="未設定" value="未設定" />
            </Picker>
            </View>
          );
      }
    case '数学':
      switch (props.field) {
        case '数Ⅰ':
          return suu1(props);
        case '数Ⅱ':
          return suu2(props);
        case '数Ⅲ':
          return suu3(props);
        case '数A':
          return suuA(props);
        case '数B':
          return suuB(props);
        default:
          return (
            <View style={styles.picker}>
            <Picker
            style={styles.postInput}
            enabled={false}>
              <Picker.Item label="未設定" value="未設定" />
            </Picker>
            </View>
          );
      }
    case '英語':
      switch (props.field) {
        case '単語':
          return tango(props);
        case '文法':
          return bunpou(props);
        case '読解':
          return dokkai(props);
        case '英作文':
          return eisakubun(props);
        default:
          return (
            <View style={styles.picker}>
            <Picker
            style={styles.postInput}
            enabled={false}>
              <Picker.Item label="未設定" value="未設定" />
            </Picker>
            </View>
          );
      }
    case '理科':
      switch (props.field) {
        case '物理':
          return butsuri(props);
        case '化学':
          return kagaku(props);
        case '生物':
          return seibutsu(props);
        case '地学':
          return chigaku(props);
        default:
          return (
            <View style={styles.picker}>
            <Picker
            style={styles.postInput}
            enabled={false}>
              <Picker.Item label="未設定" value="未設定" />
            </Picker>
            </View>
          );
      }
    case '社会':
      switch (props.field) {
        case '日本史':
          return nihonshi(props);
        case '世界史':
          return sekaishi(props);
        case '倫理・政経':
          return rinsei(props);
        case '地理':
          return chiri(props);
        case '現代社会':
          return gensha(props);
        default:
          return (
            <View style={styles.picker}>
            <Picker
            style={styles.postInput}
            enabled={false}>
              <Picker.Item label="未設定" value="未設定" />
            </Picker>
            </View>
          );
      }
    default:
      return (
        <View style={styles.picker}>
        <Picker
        style={styles.postInput}
        enabled={false}>
          <Picker.Item label="未設定" value="未設定" />
        </Picker>
        </View>
      );
  }
}
export function GradeItem(props) {
  const [state,setState]=useState('');
  return(
  <>
    <Picker
    style={styles.input}
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateGrade(itemValue)}}>
      <Picker.Item label="学年" value="未設定" />
      <Picker.Item label="中学1年" value="中学1年" />
      <Picker.Item label="中学2年" value="中学2年" />
      <Picker.Item label="中学3年" value="中学3年" />
      <Picker.Item label="高校1年" value="高校1年" />
      <Picker.Item label="高校2年" value="高校2年" />
      <Picker.Item label="高校3年" value="高校3年" />
    </Picker>
  </>
  );
}
export function TGradeItem(props) {
  const [state,setState]=useState('');
  return(
  <>
    <Picker
    style={styles.input}
    selectedValue={state}
    onValueChange={(itemValue)=>{setState(itemValue),props.updateGrade(itemValue)}}>
      <Picker.Item label="学年" value="未設定" />
      <Picker.Item label="大学1年" value="大学1年" />
      <Picker.Item label="大学2年" value="大学2年" />
      <Picker.Item label="大学3年" value="大学3年" />
      <Picker.Item label="大学4年" value="大学4年" />
      <Picker.Item label="大学院1年" value="大学院1年" />
      <Picker.Item label="大学院2年" value="大学院2年" />
    </Picker>
  </>
  );
}
const styles=StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    padding: 8,
  },
  postInput:{
  },
  picker:{
    backgroundColor: '#ddd',
    height:45,
    alignSelf:'center',
    width:'32%',
    marginLeft:30,
  },
})