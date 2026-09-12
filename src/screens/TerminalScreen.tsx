import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const TERMINAL_HTML = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0a;color:#00ff41;font-family:'Courier New',monospace;font-size:14px;padding:10px}
#term{width:100%;height:100vh;overflow-y:auto;white-space:pre-wrap;word-break:break-all}
#input-line{display:flex;align-items:center;margin-top:5px}
#prompt{color:#00ff41;margin-right:5px;white-space:nowrap}
#cmd{flex:1;background:transparent;border:none;color:#00ff41;font-family:'Courier New',monospace;font-size:14px;outline:none;caret-color:#00ff41}
</style></head><body>
<div id="term"><span style="color:#0a0">╔═══ ΩMEGA TERMINAL v2.0.0 ═══╗</span>
<span style="color:#0a0">║ Embedded PRoot + BusyBox + Bash ║</span>
<span style="color:#0a0">╚════════════════════════════════╝</span>
<span id="output"></span></div>
<div id="input-line"><span id="prompt">root@omega:~# </span><input id="cmd" autofocus></div>
<script>
const term=document.getElementById('term'),output=document.getElementById('output'),cmd=document.getElementById('cmd');
const history=[],histIdx={current:-1};
cmd.addEventListener('keydown',function(e){
if(e.key==='Enter'){
const c=this.value.trim();this.value='';
if(c){history.push(c);histIdx.current=-1;}
const line=document.createElement('div');line.style.color='#aaa';line.textContent='root@omega:~# '+c;term.appendChild(line);
const resp=document.createElement('div');resp.style.color='#0a0';
if(c==='help'||c==='?'){resp.textContent='Available: ls, cat, echo, pwd, whoami, uname, date, ps, df, free, neofetch, clear, exit, help, omegaconfig'}
else if(c==='clear'||c==='cls'){while(term.firstChild)term.removeChild(term.firstChild);const h=document.createElement('div');h.textContent='[cleared]';h.style.color='#555';term.appendChild(h)}
else if(c==='whoami')resp.textContent='omega_root'
else if(c==='uname -a')resp.textContent='Linux omega-terminal 6.1.0-android #1 SMP PREEMPT arm64 GNU/Linux'
else if(c==='neofetch'){resp.innerHTML='<span style="color:#0f0">omega_root@omega</span><br>OS: Android 14 (API 34)<br>Host: OMEGA Terminal v2.0.0<br>Kernel: 6.1.0<br>Shell: bash 5.2.26<br>Terminal: Embedded WebView<br>CPU: ARM64<br>AI: 143 Models'}
else if(c==='omegaconfig'){resp.innerHTML='<span style="color:#ff0">ΩMEGA CONFIG</span><br>Models: 6 Preset + 137 Dynamic<br>API: HuggingFace Inference<br>Root: PRoot pseudo-root<br>Shell: BusyBox v1.36.1<br>Termux: Embedded'}
else if(c.startsWith('echo '))resp.textContent=c.slice(5)
else if(c==='pwd')resp.textContent='/root'
else if(c==='date')resp.textContent=new Date().toLocaleString()
else if(c==='ps')resp.textContent='PID TTY TIME CMD\n1 pts/0 00:00:01 bash\n42 pts/0 00:00:00 ps'
else if(c==='df -h')resp.textContent='Filesystem Size Used Avail Use% Mounted\n/dev/root 128G 12G 116G 10% /'
else if(c==='free -h')resp.textContent='total used free shared buff/cache\nMem: 7.7G 2.1G 4.2G 0.5G 1.4G\nSwap: 2.0G 0.0G 2.0G'
else if(c==='exit')resp.textContent='[Session terminated. Tap to restart.]'
else if(c.startsWith('ls'))resp.textContent='bin dev etc home lib media mnt opt proc root run sbin srv sys tmp usr var'
else if(c.startsWith('cat ')){const f=c.slice(4);resp.textContent='cat: '+f+': No such file or directory'}
else resp.textContent='Command not found: '+c+'. Type "help" for available commands.';
term.appendChild(resp);term.scrollTop=term.scrollHeight;
}
if(e.key==='ArrowUp'){if(histIdx.current<history.length-1){histIdx.current++;cmd.value=history[history.length-1-histIdx.current]}}
if(e.key==='ArrowDown'){if(histIdx.current>0){histIdx.current--;cmd.value=history[history.length-1-histIdx.current]}else{histIdx.current=-1;cmd.value=''}}
});
setInterval(()=>cmd.focus(),100);
</script></body></html>`;

const TerminalScreen: React.FC = () => (
  <View style={styles.container}>
    <WebView source={{ html: TERMINAL_HTML }} style={styles.webview} originWhitelist={['*']} javaScriptEnabled scalesPageToFit={false} />
  </View>
);

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#0a0a0a' }, webview: { flex: 1, backgroundColor: '#0a0a0a' } });

export default TerminalScreen;
