import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useApp, COLOR_PRESETS } from '../services/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen: React.FC = () => {
  const { state, dispatch, sendMessage } = useApp();
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const flatRef = useRef<FlatList>(null);
  const a = state.appearance;

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0a' },
    presetBar: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#111' },
    presetDot: { width: 24, height: 24, borderRadius: 12, marginHorizontal: 4, borderWidth: 2 },
    customBtn: { padding: 6, marginHorizontal: 4 },
    list: { flex: 1 },
    msgRow: { flexDirection: 'row', marginVertical: a.messageSpacing / 2 },
    bubble: { maxWidth: '85%', paddingHorizontal: 12, paddingVertical: 8 },
    msgText: { fontSize: a.fontSize, lineHeight: a.fontSize * 1.5 },
    modelLabel: { fontSize: 10, marginBottom: 4, opacity: 0.7 },
    timestamp: { fontSize: 10, marginTop: 4, textAlign: 'right' },
    emptyText: { color: '#444', textAlign: 'center', marginTop: 60, fontSize: 16 },
    inputRow: { flexDirection: 'row', padding: 8, backgroundColor: '#111', alignItems: 'flex-end' },
    input: { flex: 1, backgroundColor: '#1a1a1a', color: '#00ff41', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, maxHeight: 100, fontSize: 14 },
    sendBtn: { padding: 10, marginLeft: 8 },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
    modalContent: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 12, width: '85%' },
    modalTitle: { color: '#00ff41', fontSize: 18, marginBottom: 16, textAlign: 'center' },
    colorInput: { flex: 1, backgroundColor: '#000', color: '#00ff41', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4, fontSize: 14, fontFamily: 'monospace' },
    colorSwatch: { width: 24, height: 24, borderRadius: 4, marginLeft: 8, borderWidth: 1, borderColor: '#333' },
    closeBtn: { alignItems: 'center', marginTop: 16, padding: 10 },
  });

  const handleSend = () => {
    if (input.trim() && !state.isStreaming) { sendMessage(input); setInput(''); }
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.msgRow, { justifyContent: isUser ? (a.userAlignment === 'right' ? 'flex-end' : 'flex-start') : (a.userAlignment === 'right' ? 'flex-start' : 'flex-end') }]}>
        <View style={[styles.bubble, { backgroundColor: isUser ? a.userBg : a.aiBg, borderRadius: a.bubbleStyle === 'square' ? 0 : a.bubbleStyle === 'minimal' ? 4 : a.bubbleRadius }]}>
          {a.showModelLabels && !isUser && item.model && <Text style={[styles.modelLabel, { color: isUser ? a.userText : a.aiText }]}>{item.model.split('/').pop()}</Text>}
          <Text style={[styles.msgText, { color: isUser ? a.userText : a.aiText }]}>{item.content}</Text>
          {a.showTimestamps && <Text style={[styles.timestamp, { color: (isUser ? a.userText : a.aiText) + '80' }]}>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView horizontal style={styles.presetBar} showsHorizontalScrollIndicator={false}>
        {COLOR_PRESETS.map((p, i) => (
          <TouchableOpacity key={i} style={[styles.presetDot, { backgroundColor: p.aiText, borderColor: a.presetIndex === i ? '#fff' : 'transparent' }]}
            onPress={() => dispatch({ type: 'UPDATE_APPEARANCE', payload: { presetIndex: i } })} />
        ))}
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.customBtn}><Icon name="palette" size={18} color="#00ff41" /></TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: 'CLEAR_MESSAGES' })} style={styles.customBtn}><Icon name="delete-sweep" size={18} color="#ff4444" /></TouchableOpacity>
      </ScrollView>
      <FlatList ref={flatRef} data={state.messages} keyExtractor={item => item.id} renderItem={renderMessage}
        style={styles.list} contentContainerStyle={{ paddingHorizontal: a.messageSpacing, paddingVertical: 8 }}
        onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={<Text style={styles.emptyText}>Send a message to start...</Text>} />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Type a message..." placeholderTextColor="#666" multiline maxLength={4000} />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={state.isStreaming}>
          <Icon name={state.isStreaming ? 'hourglass-top' : 'send'} size={24} color="#00ff41" />
        </TouchableOpacity>
      </View>
      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Custom Colors</Text>
            {['User Bubble', 'User Text', 'AI Bubble', 'AI Text'].map((label, idx) => {
              const keys = ['userBg', 'userText', 'aiBg', 'aiText'] as const;
              return (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                  <Text style={{ color: '#aaa', width: 100 }}>{label}</Text>
                  <TextInput style={styles.colorInput} value={a[keys[idx]]}
                    onChangeText={v => dispatch({ type: 'UPDATE_APPEARANCE', payload: { [keys[idx]]: v } })}
                    placeholder="#hex" placeholderTextColor="#555" maxLength={7} />
                  <View style={[styles.colorSwatch, { backgroundColor: a[keys[idx]] }]} />
                </View>
              );
            })}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowPicker(false)}><Text style={{ color: '#00ff41' }}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
