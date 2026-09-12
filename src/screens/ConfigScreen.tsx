import React from 'react';
import { View, Text, ScrollView, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useApp } from '../services/AppContext';

const ConfigScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const c = state.aiConfig; const a = state.appearance;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>AI Parameters</Text>
      <ConfigSlider label="Max Tokens" value={c.maxTokens} min={256} max={16384} step={256} onChange={v => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { maxTokens: v } })} />
      <ConfigSlider label="Top P" value={c.topP} min={0} max={1} step={0.05} onChange={v => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { topP: v } })} />
      <ConfigSlider label="Frequency Penalty" value={c.frequencyPenalty} min={-2} max={2} step={0.1} onChange={v => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { frequencyPenalty: v } })} />
      <ConfigSlider label="Presence Penalty" value={c.presencePenalty} min={-2} max={2} step={0.1} onChange={v => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { presencePenalty: v } })} />
      <ConfigSlider label="Repetition Penalty" value={c.repetitionPenalty} min={0.5} max={2} step={0.05} onChange={v => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { repetitionPenalty: v } })} />
      <Text style={styles.label}>Response Format</Text>
      <View style={styles.row}>
        {['text', 'json', 'structured'].map(fmt => (
          <Text key={fmt} style={[styles.option, c.responseFormat === fmt && styles.optionActive]} onPress={() => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { responseFormat: fmt as any } })}>{fmt}</Text>
        ))}
      </View>
      <View style={styles.switchRow}><Text style={styles.label}>Reasoning (R1)</Text><Switch value={c.reasoning} onValueChange={v => dispatch({ type: 'UPDATE_AI_CONFIG', payload: { reasoning: v } })} trackColor={{ false: '#333', true: '#00ff41' }} thumbColor={c.reasoning ? '#0a0' : '#666'} /></View>
      <Text style={styles.sectionTitle}>Appearance</Text>
      <ConfigSlider label="Font Size" value={a.fontSize} min={10} max={24} step={1} onChange={v => dispatch({ type: 'UPDATE_APPEARANCE', payload: { fontSize: v } })} />
      <ConfigSlider label="Bubble Radius" value={a.bubbleRadius} min={0} max={24} step={2} onChange={v => dispatch({ type: 'UPDATE_APPEARANCE', payload: { bubbleRadius: v } })} />
      <ConfigSlider label="Message Spacing" value={a.messageSpacing} min={0} max={24} step={2} onChange={v => dispatch({ type: 'UPDATE_APPEARANCE', payload: { messageSpacing: v } })} />
      <Text style={styles.label}>Bubble Style</Text>
      <View style={styles.row}>
        {['rounded', 'square', 'minimal'].map(s => (
          <Text key={s} style={[styles.option, a.bubbleStyle === s && styles.optionActive]} onPress={() => dispatch({ type: 'UPDATE_APPEARANCE', payload: { bubbleStyle: s as any } })}>{s}</Text>
        ))}
      </View>
      <Text style={styles.label}>User Alignment</Text>
      <View style={styles.row}>
        {['right', 'left'].map(al => (
          <Text key={al} style={[styles.option, a.userAlignment === al && styles.optionActive]} onPress={() => dispatch({ type: 'UPDATE_APPEARANCE', payload: { userAlignment: al as any } })}>{al}</Text>
        ))}
      </View>
      <View style={styles.switchRow}><Text style={styles.label}>Show Timestamps</Text><Switch value={a.showTimestamps} onValueChange={v => dispatch({ type: 'UPDATE_APPEARANCE', payload: { showTimestamps: v } })} trackColor={{ false: '#333', true: '#00ff41' }} thumbColor={a.showTimestamps ? '#0a0' : '#666'} /></View>
      <View style={styles.switchRow}><Text style={styles.label}>Show Model Labels</Text><Switch value={a.showModelLabels} onValueChange={v => dispatch({ type: 'UPDATE_APPEARANCE', payload: { showModelLabels: v } })} trackColor={{ false: '#333', true: '#00ff41' }} thumbColor={a.showModelLabels ? '#0a0' : '#666'} /></View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const ConfigSlider = ({ label, value, min, max, step, onChange }: any) => (
  <View style={{ marginVertical: 8 }}>
    <Text style={styles.label}>{label}: {value}</Text>
    <Slider style={{ height: 40 }} minimumValue={min} maximumValue={max} step={step} value={value}
      onValueChange={onChange} minimumTrackTintColor="#00ff41" maximumTrackTintColor="#333" thumbTintColor="#00ff41" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', paddingHorizontal: 16 },
  sectionTitle: { color: '#00ff41', fontSize: 18, marginTop: 20, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a2e', paddingBottom: 4 },
  label: { color: '#aaa', fontSize: 14, marginVertical: 4 },
  row: { flexDirection: 'row', marginVertical: 8 },
  option: { color: '#666', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: '#333', marginRight: 8, fontSize: 12 },
  optionActive: { color: '#00ff41', borderColor: '#00ff41', backgroundColor: '#003300' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
});

export default ConfigScreen;
