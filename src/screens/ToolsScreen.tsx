import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useApp, PRESET_MODELS } from '../services/AppContext';

const ToolsScreen: React.FC = () => {
  const { state, dispatch, fetchDynamicModels } = useApp();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'presets' | 'dynamic'>('presets');
  useEffect(() => { fetchDynamicModels(); }, []);
  const filteredDynamic = state.dynamicModels.filter(m => m.id.toLowerCase().includes(search.toLowerCase()) || m.name.toLowerCase().includes(search.toLowerCase())).slice(0, 50);
  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, tab === 'presets' && styles.tabActive]} onPress={() => setTab('presets')}><Text style={[styles.tabText, tab === 'presets' && styles.tabTextActive]}>Presets (6)</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'dynamic' && styles.tabActive]} onPress={() => setTab('dynamic')}><Text style={[styles.tabText, tab === 'dynamic' && styles.tabTextActive]}>All Models ({state.dynamicModels.length})</Text></TouchableOpacity>
      </View>
      {tab === 'dynamic' && <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder="Search models..." placeholderTextColor="#555" />}
      {state.isLoadingModels && tab === 'dynamic' ? <ActivityIndicator size="large" color="#00ff41" style={{ marginTop: 40 }} /> : (
        <FlatList data={tab === 'presets' ? PRESET_MODELS : filteredDynamic} keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isSelected = state.selectedModel === item.id;
            return (
              <TouchableOpacity style={[styles.modelItem, isSelected && styles.modelSelected]} onPress={() => dispatch({ type: 'SET_MODEL', payload: item.id })}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.modelName, isSelected && styles.modelNameSelected]}>{(item as any).name || item.id.split('/').pop()}</Text>
                  <Text style={styles.modelId}>{item.id}</Text>
                  {(item as any).description && <Text style={styles.modelDesc}>{(item as any).description}</Text>}
                </View>
                {isSelected && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            );
          }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  tabRow: { flexDirection: 'row', backgroundColor: '#111', padding: 4 },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#00ff41' },
  tabText: { color: '#666', fontSize: 14 }, tabTextActive: { color: '#00ff41' },
  search: { backgroundColor: '#1a1a1a', color: '#00ff41', margin: 12, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  modelItem: { flexDirection: 'row', padding: 14, borderBottomWidth: 1, borderBottomColor: '#1a1a2e', alignItems: 'center' },
  modelSelected: { backgroundColor: '#00330022' },
  modelName: { color: '#ccc', fontSize: 15 }, modelNameSelected: { color: '#00ff41' },
  modelId: { color: '#555', fontSize: 11, marginTop: 2 },
  modelDesc: { color: '#777', fontSize: 12, marginTop: 2 },
  check: { color: '#00ff41', fontSize: 20, marginLeft: 8 },
});

export default ToolsScreen;
