import React,{useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native'
import {Picker} from 'native-base';

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