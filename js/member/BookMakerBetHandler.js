if(typeof(BookMakerBetHandler)=="undefined"){BookMakerBetHandler={}}(function(){var j=5;BookMakerBetHandler.appendBoard=function(u,A,r,q,F,v,t,G,y,z){BookMakerBetHandler.clearBoard(q);var D=DataBase.bookMakerBet.generateKey(q,F,v,t);var x=DataBase.bookMakerBet.add(r,q,F,v,t,G,y,z);var E=false;var B=m(D,q,F,v,t,x);A.after(B.fadeIn());B.find("#odds").html(x.odds);if(PageConfig.userCoin!=null&&PageConfig.userCoin>0){var s=DataBase.bookMakerMarkets.get(q,F);var w=parseFloat(PageConfig.userCoin);if(s.min&&parseFloat(s.min)>PageConfig.userCoin){w=parseFloat(s.min)}B.find("#inputStake").val(w);E=DataBase.bookMakerBet.updateStake(q,F,v,t,w)}else{B.find("#inputStake").val("")}var C=k(B,q,F);BookMakerBetHandler.eventCalculate(B,q,F,v,t,E);B.find("#odds").select();BookMakerBetHandler.updateExposure(q);CoinHandler.showBookMakerBetCoin(B)};BookMakerBetHandler.clearBoard=function(r){var s=$j("#overWrap");var q=s.find("[id^=bookMakerBetBoard_]");$j.each(q,function(u,x){x=s.find(x);if(x.length>0){var w=x.prop("eventId");var y=x.prop("marketId");var t=x.prop("selectionId");var v=x.prop("sideType");b(x,w,y,t,v)}});DataBase.bookMakerBet.clearByEventId(r)};BookMakerBetHandler.hideBetBoardBySelection=function(u,w,t){var v=$j("#bookMakerMarketList");for(var s in SideType){if(!SideType[s]||!SideType[s].value){continue}var r=DataBase.bookMakerBet.generateKey(u,w,t,SideType[s].unique());var q=v.find("#bookMakerBetBoard_"+r);if(q.length==0){continue}q.hide();DataBase.bookMakerBet.remove(u,w,t,SideType[s].unique())}};function b(t,s,u,q,r){t.hide()}function m(s,u,x,r,t,q){var v=$j("#overWrap");var w=v.find("#bookMakerBetBoard_"+s);if(w.length==0){w=a(v,s,u,x,r,t,q)}w.find("#bookMakerBetAcceptAnyOdds").prop("checked",TopMenuHandler.isAcceptAnyOdds("fancyBet"));return w}function a(r,z,q,A,u,s,w){var y=r.find("#bookMakerBetTemplate").clone();var t=y.find("#bookMakerBetHeader");var x=y.find("#oddsHeader");var v=SideType.Back.unique()==s?SideType.Back.name:SideType.Lay.name;y.find("#classWrap").removeClass("slip-back").removeClass("slip-lay").addClass("slip-"+v.toLowerCase());y.prop("id","bookMakerBetBoard_"+z);y.prop("eventId",q);y.prop("marketId",A);y.prop("selectionId",u);y.prop("sideType",s);t.find("#acceptCheck").before(StringUtil.ucfirst(SideType.getInstanceOf(s).name));x.find("#odds").html(w.odds);d(y,q,A,u,s,z);return y}function d(u,t,v,r,s,q){u.find("#placeBet").unbind("click").click(function(){if(typeof(LoginHandler)!="undefined"&&!LoginHandler.userIsLogin()){return}var w=k(u,t,v);f(u,t,v,r,s,q,w)});u.find("#cancel").unbind("click").click(function(){DataBase.bookMakerBet.clearByEventId(t);b(u,t,v,r,s);BookMakerMarketHandler.removeSelectClass();BookMakerBetHandler.getExposure(t,v)});u.find("#inputStake").click(function(){u.find("#inputStake").select()});u.find("#inputStake").change(function(){var w=parseFloat(u.find("#inputStake").val())||0;var y=k(u,t,v);var x=DataBase.bookMakerBet.updateStake(t,v,r,s,w);BookMakerBetHandler.eventCalculate(u,t,v,r,s,x)});u.find("#inputStake").blur(function(){CoinHandler.hideStakePopupList();var w=parseFloat(u.find("#inputStake").val())||0;var y=k(u,t,v);var x=DataBase.bookMakerBet.updateStake(t,v,r,s,w);BookMakerBetHandler.eventCalculate(u,t,v,r,s,x)});u.find("#inputStake").keydown(function(x){var w=x.which;if(KeyEventUtils.isNumberKey(x)||KeyEventUtils.isBackspaceKey(w)||KeyEventUtils.isDeleteKey(w)||KeyEventUtils.isArrowKey(w)||KeyEventUtils.isTabKey(w)||KeyEventUtils.isEnterKey(w)){return}WindowEventUtil.stopEvent(x)});u.find("#inputStake").keyup(function(z){$j(this).val(function(B,C){return StringUtil.commaSeparateNumber(C)});var w=parseFloat(u.find("#inputStake").val())||0;var A=k(u,t,v);var x=DataBase.bookMakerBet.updateStake(t,v,r,s,w);BookMakerBetHandler.eventCalculate(u,t,v,r,s,x);var y=z.which;if(KeyEventUtils.isEnterKey(y)){u.find("#placeBet").click()}if(KeyEventUtils.isTabKey(y)&&u.find("#inputStake").is(":focus")){u.find("#inputStake").select()}})}BookMakerBetHandler.eventCalculate=function(v,q,w,s,r,x){var t=DataBase.bookMakerBet.get(q,w,s,r);var u=o(t);var y=v.find("#placeBet");if(!u){y.addClass("disable")}else{y.removeClass("disable")}BookMakerBetHandler.getExposure(q,w)};function o(s){if(s==null){return false}var u=DataBase.bookMakerMarkets.get(s.eventId,s.marketId);if(u==null){return false}var t=u.min;var q=u.max;if(!t||!q){return false}var r=parseFloat(s.stake||"0");if(r<t||r>q){return false}return true}function f(B,q,E,w,u,D,C){var r=B.find("#inputStake");var s=parseFloat(r.val())||0;var x=DataBase.bookMakerBet.get(q,E,w,u);var G="";var y=o(x);if(!y){var t=DataBase.bookMakerMarkets.get(q,x.marketId);var v=t.min;var z=t.max;if(s<v){r.val(v);DataBase.bookMakerBet.updateStake(q,E,w,u,v);G+=I18N.get("msg.member.minBet")}else{if(s>z){r.val(z);DataBase.bookMakerBet.updateStake(q,E,w,u,z);G+=I18N.get("msg.member.maxBet")}}}if(G!=""&&!y){e(C,"warning",G,true)}BookMakerBetHandler.getExposure(q,E);if(!y){B.find("#placeBet").removeClass("disable");return}x=DataBase.bookMakerBet.getForBet(q,E,w,u);var F=$j("#bookMakerBetBar_"+D);if(F.length==0){F=n(D);B.after(F)}var A=B.find("#bookMakerBetAcceptAnyOdds").is(":checked")?1:0;BookMakerBetHandler.submitBet(x,F,C,null,A);b(B,q,E,u)}BookMakerBetHandler.submitBet=function(q,v,w,u,t){var s=0;var r=0;$j.ajax({type:"POST",dataType:"JSON",url:"/exchange/member/playerService/bookMakerBet",data:{bookMakerBets:JSON.stringify([q]),isOneClickBet:u,isAcceptAnyOdds:t},beforeSend:function(){if(v!=null){v.show();i(v,j)}BookMakerMarketHandler.showDelayBetting(q.eventId,q.marketId,q.selectionId)},complete:function(){},success:function(x){try{if(x.error){if(w!=null){e(w,"error",x.error,true)}else{NoticeHandler.error(x.error)}BookMakerMarketHandler.hideDelayBetting(q.eventId,q.marketId,q.selectionId);return}if(x.result.length==0){BookMakerMarketHandler.hideDelayBetting(q.eventId,q.marketId,q.selectionId);return}for(var y in x.result){var C=x.result[y];if(C.status=="SUCCESS"){if(s==0&&r==0){s=C.eventId;r=C.marketId}var B=C.bookMakerTxn;if(B!=null){DataBase.bookMakerTxn.update([B]);if(w!=null){e(w,"success",null,true,"txn",B)}}}else{if(C.error){if(w!=null){e(w,"error",C.error,true)}else{NoticeHandler.error(C.error)}BookMakerMarketHandler.hideDelayBetting(q.eventId,q.marketId)}}}if(s!=0&&r!=""){TxnHandler.setEventIdAndMarketId(s,r,CategoryType.BOOK_MAKER.unique());s=0;r=""}TxnHandler.updateOpenBetSelectionBox();TxnHandler.checkToHideOpenBets();var z=BetHandler.calculateTotalLiability();JsCache.get("#betSlipFullBtn").find("#total").html(CurrencyUtil.formatter(z))}catch(A){Trace.printStackTrace(A)}finally{if(v!=null){v.hide()}BookMakerMarketHandler.removeSelectClass();DataBase.bookMakerBet.clearByEventId(q.eventId);BookMakerBetHandler.getExposure(q.eventId,q.marketId)}},error:function(x){Trace.printStackTrace(x);if(v!=null){v.hide()}BookMakerMarketHandler.hideDelayBetting(q.eventId,q.marketId)}});JsCache.get("#confirmBetList").hide();JsCache.get("#confirmBetFullBtn").hide()};function n(q){var r=$j("#bookMakerTempTable").find("#bookMakerBetBarTemplate").clone();r.prop("id","bookMakerBetBar_"+q);return r}function i(t,q){var s=MathUtil.decimal.multiply(q,10);var r=""+MathUtil.decimal.multiply(q,10);if(s>=0){c(s,r,t)}}function c(t,s,u){var q=u.find("#progressBar");var r=l(t,s);q.css("width",r);u.find("#secRemain").html(MathUtil.decimal.divide(t,10)+" sec remaining…");if(t>0){t--;setTimeout(function(){c(t,s,u)},100)}}function l(t,s){var u=MathUtil.decimal.subtract(s,t);var q=MathUtil.decimal.divide(u,s);if(q>1){q=1}var r=MathUtil.decimal.multiply(q,100);return Math.round(r)+"%"}function k(s,q,t){var r=$j("#overWrap");var u=r.find("#bookMakerBetMessage_"+DataBase.bookMakerMarkets.getMarketKey(q,t));if(u.length==0){u=p(q,t)}s.after(u);return u}function p(q,r){var s=$j("#bookMakerTempTable").find("#bookMakerBetMessageTemplate").clone();s.prop("id","bookMakerBetMessage_"+DataBase.bookMakerMarkets.getMarketKey(q,r));return s}function e(y,x,z,v,t,u){var q=y.find("#header");UiUtils.removeContents(y.find("#info"));y.find("#classWrap").removeClass("success").removeClass("error").removeClass("warning").addClass(x);if(z!=null){q.html(z)}if(u!=null){var s=u.stake;var w=CurrencyType.getInstanceOf(PageConfig.playerCurrency);var r=w.name+w.symbol+s+" at odds "+u.odds;CurrencyUtil.updateSetting({currencySymbol:w.symbol});if(SideType.Back.unique()==u.sideType){r+=" Profit: "}else{r+=" Liability: "}if(EventType.CRICKET.unique()==u.eventType){r+=MyTransactionUtils.getFancyBetPL(u.odds,u.stake)}else{r+=UnMatchTicketUtil.getPL(u.odds,u.stake)}q.html("Bet Matched");q.after(r)}y.find("#close").unbind("click").click(function(){y.fadeOut()});if(v){setTimeout(function(){y.fadeOut()},3000)}y.fadeIn()}BookMakerBetHandler.getExposure=function(q,y){try{var t=DataBase.bookMakerMarkets.get(q,y);if(t==null){Trace.log("fancy market "+y+" is null");return}var x=DataBase.bookMakerBet.getByMarketId(q,y);var u=DataBase.bookMakerTxn.getByMarketId(q,y+"",null,null,CategoryType.BOOK_MAKER.unique());if(x.length==0&&u.length==0){g(q,y);return}if(t.selectionMap==null){return}var s=t.selectionMap.values();var w=[MyTransactionStatusType.Active.unique(),MyTransactionStatusType.Void.unique()];u=DataBase.bookMakerTxn.getByMarketId(q,y+"",null,w,CategoryType.BOOK_MAKER.unique());var r=ExposureUtil.calculateBookMakerExposure(q,y,x,u,t,s);h(q,y,s,x,u,r);g(q,y)}catch(v){Trace.printStackTrace(v)}};function h(w,r,t,s,y,H){var C=BookMakerMarketHandler.isViewMultiMarket()?$j("#bookMakerTable_"+w):$j("#bookMakerWrap");var J=C.find("#bookMakerMarket_"+DataBase.bookMakerMarkets.getMarketKey(w,r));if(J.length==0){return}var G=WebSiteType.getInstanceOf(PageConfig.webSiteType);var u=CurrencyType.getInstanceOf(PageConfig.playerCurrency);var x={precision:2,separateSign:",",currencySymbol:u.symbol,formatter:CurrencyUtil.DefaultFormatter,"trailingZeros,":false};if(G.isFancyFairGroup()){x.precision=0;x.roundingMode="DOWN"}for(var D=0,E=t.length;D<E;D++){var L=t[D];var I=L.selectionId;var A=J.find("#bookMakerSelection_"+DataBase.bookMakerMarkets.getSelectionKey(w,r,I));if(A.length==0){continue}var z=A.find("#before");var B=A.find("#after");if(H.exposureBeforeBet){var F=H.exposureBeforeBet.betSelections;var q=0;if(F[I]==null){q=F[0].minExposure}else{q=F[I].minExposure}z.removeClass();if(parseFloat(q)>=0){z.addClass("win")}else{z.addClass("lose")}z.html(CurrencyUtil.formatter(q,x));z.show()}else{z.hide()}if(H.exposureAfterBet){var K=H.exposureAfterBet.betSelections;var v=0;if(K[I]==null){v=K[0].minExposure}else{v=K[I].minExposure}B.removeClass();if(parseFloat(v)>=0){B.addClass("to-win")}else{B.addClass("to-lose")}B.html(CurrencyUtil.formatter(v,x));B.show()}else{B.hide()}}}function g(r,v){var u=BookMakerMarketHandler.isViewMultiMarket()?$j("#bookMakerTable_"+r):$j("#bookMakerWrap");var t=u.find("#bookMakerMarket_"+DataBase.bookMakerMarkets.getMarketKey(r,v));if(t.length==0){return}var q=t.find("[id^=bookMakerSelection_]");var w=DataBase.bookMakerBet.getByMarketId(r,v);var s=DataBase.bookMakerTxn.getByMarketId(r,v+"",null,null,CategoryType.BOOK_MAKER.unique());if(w.length>0){q.find("#after").show()}else{q.find("#after").hide()}if(s.length>0){q.find("#before").show()}else{q.find("#before").hide()}}BookMakerBetHandler.updateExposure=function(v){var s=BookMakerMarketHandler.isViewMultiMarket()?("#bookMakerTable_"+v):"#overWrap";var w=$j(s);var u=w.find("[id^=bookMakerMarket_]:visible");if(u.length==0){return}for(var t=0,q=u.length;t<q;t++){var r=w.find(u[t]);var v=r.prop("eventId");var x=r.prop("marketId");if(v==null||x==null){return}BookMakerBetHandler.getExposure(v,x)}}})();if(typeof(DataBase)=="undefined"){DataBase={}}(function(){DataBase.bookMakerBet={};var a=new HashMap();DataBase.bookMakerBet.add=function(c,b,j,e,d,k,g,h){var f={eventType:c,eventId:b,marketId:j,selectionId:e,sideType:d,odds:k,eventName:g,marketName:h};var i=DataBase.bookMakerBet.generateKey(b,j,e,d);a.put(i,f);return f};DataBase.bookMakerBet.generateKey=function(d,e,b,c){return d+"_"+e+"_"+b+"_"+c};DataBase.bookMakerBet.get=function(e,f,c,d){var b=DataBase.bookMakerBet.generateKey(e,f,c,d);return a.get(b)};DataBase.bookMakerBet.remove=function(e,f,c,d){var b=DataBase.bookMakerBet.generateKey(e,f,c,d);return a.remove(b)};DataBase.bookMakerBet.queryAll=function(){return a.values()};DataBase.bookMakerBet.clear=function(){a.clear()};DataBase.bookMakerBet.clearByEventId=function(b){$j.each(a.values(),function(d,c){if(b==c.eventId){DataBase.bookMakerBet.remove(c.eventId,c.marketId,c.selectionId,c.sideType)}})};DataBase.bookMakerBet.updateStake=function(f,h,c,e,g){var d=false;var b=DataBase.bookMakerBet.get(f,h,c,e);if(b==null){return}if(b.stake==null||(b.stake!=null&&b.stake!=g)){d=true}b.stake=g;return d};DataBase.bookMakerBet.getForBet=function(e,f,c,d){var b=DataBase.bookMakerBet.get(e,f,c,d);return{eventType:b.eventType,eventId:b.eventId,marketId:b.marketId,selectionId:b.selectionId,sideType:b.sideType,odds:b.odds,stake:b.stake}};DataBase.bookMakerBet.getByMarketId=function(c,d){var b=[];$j.each(a.values(),function(f,e){if(c==e.eventId&&d==e.marketId){b.push(e)}});return b}})();