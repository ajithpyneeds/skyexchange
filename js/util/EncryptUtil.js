if(typeof(EncryptUtil)=="undefined"){EncryptUtil={}}(function(){var b=function(e,d){return((e<<d)|(e>>>(32-d)))};var c=function(g){var e,d,f="";for(e=7;e>=0;e--){d=(g>>>(e*4))&15;f+=d.toString(16)}return f};var a=function(f){f=f.replace(/\r\n/g,"\n");var e="";for(var h=0,d=f.length;h<d;h++){var g=f.charCodeAt(h);if(g<128){e+=String.fromCharCode(g)}else{if((g>127)&&(g<2048)){e+=String.fromCharCode((g>>6)|192);e+=String.fromCharCode((g&63)|128)}else{e+=String.fromCharCode((g>>12)|224);e+=String.fromCharCode(((g>>6)&63)|128);e+=String.fromCharCode((g&63)|128)}}}return e};EncryptUtil.mask=function(f){var k,v,u,t,s,r,q,p,w;var e=new Array(80);var o=1732584193;var m=4023233417;var l=2562383102;var h=271733878;var g=3285377520;f=a(f);var d=f.length;var n=new Array();for(v=0;v<d-3;v+=4){u=f.charCodeAt(v)<<24|f.charCodeAt(v+1)<<16|f.charCodeAt(v+2)<<8|f.charCodeAt(v+3);n.push(u)}switch(d%4){case 0:v=2147483648;break;case 1:v=f.charCodeAt(d-1)<<24|8388608;break;case 2:v=f.charCodeAt(d-2)<<24|f.charCodeAt(d-1)<<16|32768;break;case 3:v=f.charCodeAt(d-3)<<24|f.charCodeAt(d-2)<<16|f.charCodeAt(d-1)<<8|128;break}n.push(v);while((n.length%16)!=14){n.push(0)}n.push(d>>>29);n.push((d<<3)&4294967295);for(k=0;k<n.length;k+=16){for(v=0;v<16;v++){e[v]=n[k+v]}for(v=16;v<=79;v++){e[v]=b(e[v-3]^e[v-8]^e[v-14]^e[v-16],1)}t=o;s=m;r=l;q=h;p=g;for(v=0;v<=19;v++){w=(b(t,5)+((s&r)|(~s&q))+p+e[v]+1518500249)&4294967295;p=q;q=r;r=b(s,30);s=t;t=w}for(v=20;v<=39;v++){w=(b(t,5)+(s^r^q)+p+e[v]+1859775393)&4294967295;p=q;q=r;r=b(s,30);s=t;t=w}for(v=40;v<=59;v++){w=(b(t,5)+((s&r)|(s&q)|(r&q))+p+e[v]+2400959708)&4294967295;p=q;q=r;r=b(s,30);s=t;t=w}for(v=60;v<=79;v++){w=(b(t,5)+(s^r^q)+p+e[v]+3395469782)&4294967295;p=q;q=r;r=b(s,30);s=t;t=w}o=(o+t)&4294967295;m=(m+s)&4294967295;l=(l+r)&4294967295;h=(h+q)&4294967295;g=(g+p)&4294967295}var w=c(o)+c(m)+c(l)+c(h)+c(g);return w.toLowerCase()}})();