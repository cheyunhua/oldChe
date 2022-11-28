<template>
    <el-dialog :visible.sync="v"
               @opened="doOpened"
               @open="doOpen"
               @close="doClose"
               center
               fullscreen
               custom-class="felix-dialog"
    >

        <div ref="terminal" class="felix-xterm"></div>

    </el-dialog>
</template>

<script>
    import {Terminal} from "xterm";
    import * as fit from "xterm/lib/addons/fit/fit";
    import * as webLinks from "xterm/lib/addons/webLinks/webLinks";
    import * as search from "xterm/lib/addons/search/search";
    import "xterm/dist/xterm.css"


    let defaultTheme = {
        foreground: "#ffffff",
        background: "#1b212f",
        cursor: "#ffffff",
        selection: "rgba(255, 255, 255, 0.3)",
        black: "#000000",
        brightBlack: "#808080",
        red: "#ce2f2b",
        brightRed: "#f44a47",
        green: "#00b976",
        brightGreen: "#05d289",
        yellow: "#e0d500",
        brightYellow: "#f4f628",
        magenta: "#bd37bc",
        brightMagenta: "#d86cd8",
        blue: "#1d6fca",
        brightBlue: "#358bed",
        cyan: "#00a8cf",
        brightCyan: "#19b8dd",
        white: "#e5e5e5",
        brightWhite: "#ffffff"
    };
   let bindTerminal = (term,bufferedTime,log) => {
        term.write(log);
        
        let messageBuffer = null;
        
            if (bufferedTime && bufferedTime > 0) {
                if (messageBuffer == null) {
                    return;
                
            } else {
                term.write(messageBuffer);
            }
        }
   };
   
        
    

        
        
    

    
    export default {
        props: {visible: Boolean,log: String},
        name: "CompTermOut",
        data() {
            return {
                isFullScreen: false,
                v: this.visible,
                ter: null,
                //str: this.log

            };
        },
        watch: {
            visible(val) {
                this.v = val;//新增result的watch，监听变更并同步到myResult上
            }
        },
        

        methods: {

            onWindowResize() {
                //console.log("resize")
                this.ter.fit(); // it will make terminal resized.
            },
            doLink(ev, url) {
                if (ev.type === 'click') {
                    window.open(url)
                }
            },
            doClose() {
                window.removeEventListener("resize", this.onWindowResize);
                // term.off("resize", this.onTerminalResize);
                if (this.ter) {
                    this.ter.dispose()
                }
                this.$emit('pclose', false)//子组件对openStatus修改后向父组件发送事件通知
            },
            doOpen() {

            },
            doOpened() {
                //console.log(this.log)
                
                Terminal.applyAddon(fit);
                Terminal.applyAddon(webLinks);
                Terminal.applyAddon(search);
                this.ter = new Terminal({
                    //rows: 20,
                    fontSize: 18,
                    cursorBlink: true,
                    cursorStyle: 'bar',
                    bellStyle: "sound",
                    theme: defaultTheme
                });
                this.ter.open(this.$refs.terminal);
                this.ter.fit(); // first resizing
                this.ter.webLinksInit(this.doLink);
                this.ter.on("resize", this.onTerminalResize);
                window.addEventListener("resize", this.onWindowResize);
                bindTerminal(this.ter,-1,this.log);

               
            },

        },


    }
</script>

<style>
    .felix-xterm {
        height: calc(100vh - 60px) !important;
    }

    .felix-dialog {
        background-color: #1b212f !important;
        margin: 0 !important;

    }

    .felix-dialog .el-dialog__body {
        /*border: white solid 1px!important;*/
        padding: 0 !important;

    }

    .felix-dialog .el-dialog__title {
        color: white;
        font-weight: bold;
    }

    .felix-dialog el-dialog__headrests {
        font-size: 2rem !important;
        color: white;
        font-weight: bold !important;
    }
</style>