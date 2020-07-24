if(typeof(PopularMarketHandler)=="undefined"){PopularMarketHandler={}}(function(){PopularMarketHandler.needResetAutoUpdateSelectionsMap=false;PopularMarketHandler.showPopName="popular";var j=new HashMap();var f=-1;PopularMarketHandler.init=function(){var k=EventType.getInstanceOf(PageConfig.selectEventType);if(k==null){j.clear();return}var l=k.popularTabType;if(l==null||l.length==0){j.clear();return}if(PageConfig.selectEventType!=f){j.clear();for(var m in l){var n=l[m];j.put(n.name,n)}f=PageConfig.selectEventType}PopularMarketHandler.showPopName=l[0].name;c();JsCache.get("#popularMarkets").find("#popularTab_"+l[0].name).find("a").addClass("select")};PopularMarketHandler.clickPopularTab=function(k){c();JsCache.get("#popularMarkets").find("#popularTab_"+k).find("a").addClass("select");PopularMarketHandler.showPopName=k};var c=function(){JsCache.get("#popularMarkets").find("a").removeClass("select")};PopularMarketHandler.getTabTypeByName=function(k){return j.get(k)};PopularMarketHandler.startsWithMapping=function(k){if(k.match("OVER_UNDER")){return"OVER_UNDER"}else{if(k.match("TEAM_A")&&k!="TEAM_A_WIN_TO_NIL"){return"TEAM_A"}else{if(k.match("TEAM_B")&&k!="TEAM_B_WIN_TO_NIL"){return"TEAM_B"}else{if(k.match("FIRST_HALF_GOALS")){return"FIRST_HALF_GOALS"}else{return k}}}}};PopularMarketHandler.appendPopMarketTab=function(k,t){var s=j.entrySet();for(var q in s){var m=s[q].value;for(var q in t){var o=t[q];var r=MarketUtil.isCloseSite(o.closeSite,PageConfig.webSiteType);if(PageConfig.selectMarketId==o.marketId||MarketUtil.isClosed(o.status)||r){continue}var n=o.marketType;if(PopularMarketHandler.isValidPopMarketType(n,m.marketTypes)==true){PopularMarketHandler.appendTabByType(k,m)}if(PopularMarketHandler.isOtherMarkets(n)==true){PopularMarketHandler.appendTabByType(k,j.get("other_markets"))}}}var p=JsCache.get("#popularMarkets").show();var u=p.find("[id^=popularTab_]");u.sort(function(w,v){var y=$j(w).attr("tabName").trim();var x=$j(v).attr("tabName").trim();if(y=="other_markets"){return 1}if(x=="other_markets"){return -1}});p.append(u);c();var l=$j(u[0]);if(l.length>0){l.find("a").addClass("select");PopularMarketHandler.showPopName=l.attr("tabName")}if(u.length==0){p.hide()}};PopularMarketHandler.appendTabByType=function(l,n){var m=JsCache.get("#popularMarkets");var k=$j("#popularTab_"+n.name);if(k.length==0){k=JsCache.clone("#popularMarketTemplate");k.attr("id","popularTab_"+n.name);k.attr("tabName",n.name);k.attr("eventId",l);k.find("a").html(StringUtil.ucfirst(n.name.replace(/\_/g," ")));k.click(function(o){return function(){PopularMarketHandler.clickPopularTab(o.name);$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryMarketsWithoutSelectionPath,data:{eventType:PageConfig.selectEventType,eventId:PageConfig.selectEventId},success:function(p){try{DataBase.markets.update(p.eventId,p.markets);PopularMarketHandler.updateMarkets(p.eventId);PopularMarketHandler.reSortPopMarketItem(p.eventId);PopularMarketHandler.needResetAutoUpdateSelectionsMap=true;PopularMarketHandler.autoUpdateSelectionsTask.refresh()}catch(q){Trace.printStackTrace(q)}finally{}},error:function(){}})}}(n));m.append(k.show())}};PopularMarketHandler.appendAllTab=function(){if(PageConfig.selectEventId==-1||PageConfig.selectMarketId==null||EventType.getInstanceOf(PageConfig.selectEventType).isRacingEvent()){JsCache.get("#popularMarkets").hide();return}$j("[id^=popularTab_]").remove();$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryMarketsWithoutSelectionPath,data:{eventType:PageConfig.selectEventType,eventId:PageConfig.selectEventId},success:function(k){try{DataBase.markets.update(k.eventId,k.markets);if(e(k.markets)>1){PopularMarketHandler.appendPopMarketTab(k.eventId,k.markets)}else{JsCache.get("#popularMarkets").hide()}PopularMarketHandler.updateMarkets(k.eventId);PopularMarketHandler.reSortPopMarketItem(k.eventId);PopularMarketHandler.needResetAutoUpdateSelectionsMap=true;PopularMarketHandler.autoUpdateSelectionsTask.refresh()}catch(l){Trace.printStackTrace(l)}finally{}},error:function(){}})};PopularMarketHandler.isValidPopMarketType=function(l,k){if(l==null){return false}l=PopularMarketHandler.startsWithMapping(l);if(ArrayUtil.indexOf(k,l)!=-1){return true}return false};PopularMarketHandler.isOtherMarkets=function(n){if(n==null){return true}var k=true;n=PopularMarketHandler.startsWithMapping(n);var l=j.values();for(var m in l){var o=l[m];if(ArrayUtil.indexOf(o.marketTypes,n)!=-1){k=false;break}}return k};var i=new TreeMap();function g(k){if(i.get(k)==null){i.put(k,-1)}}PopularMarketHandler.autoUpdateSelectionsTask=null;PopularMarketHandler.initAutoUpdateSelectionsTask=function(){PopularMarketHandler.autoUpdateSelectionsTask=TaskExecuter.createTask(PageConfig.autoUpdateSelectionsTaskCycleTime,0,function(){a(this)});PopularMarketHandler.autoUpdateSelectionsTask.run();TaskExecuter.execute()};function a(m){try{var p=$j("#overWrap");if(PageConfig.selectEventId==-1||PageConfig.selectMarketId==null){if(i.length>0){i=new TreeMap()}return}if(PopularMarketHandler.needResetAutoUpdateSelectionsMap){i=new TreeMap();PopularMarketHandler.needResetAutoUpdateSelectionsMap=false}var k=[];var l=i.keySet();var o=l.length;for(var n=0;n<o;n++){var r=l[n];if(p.find("#popMarketItem_"+r.replace(".","_")).hasClass("close")){continue}k[k.length]=r}if(k.length>0){d(PageConfig.selectEventId,k)}}catch(q){Trace.printStackTrace(q)}finally{m.check();TaskExecuter.execute()}}PopularMarketHandler.getMarketsTask=null;PopularMarketHandler.initGetMarketsTask=function(){PopularMarketHandler.getMarketsTask=TaskExecuter.createTask(PageConfig.queryMarketsWithoutSelectionCycleTimes,0,function(){h(this)});PopularMarketHandler.getMarketsTask.run();TaskExecuter.execute()};function h(k){if(PageConfig.selectEventId==-1||PageConfig.selectMarketId==null){k.check();TaskExecuter.execute();return}$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryMarketsWithoutSelectionPath,data:{eventType:PageConfig.selectEventType,eventId:PageConfig.selectEventId},success:function(l){try{JsCache.get("#listBoardLoading").hide();JsCache.get("#loading").hide();DataBase.markets.update(l.eventId,l.markets);if(e(l.markets)>1){JsCache.get("#popularMarkets").show()}else{JsCache.get("#popularMarkets").hide()}PopularMarketHandler.updateMarkets(l.eventId);PopularMarketHandler.autoUpdateSelectionsTask.refresh()}catch(m){Trace.printStackTrace(m)}finally{k.check();TaskExecuter.execute()}},error:function(){k.check();TaskExecuter.execute()}})}function b(s,v,o,k,r,l,n,p,z,x,B){if(n!=null&&n.length>0){n.sort(function(G,F){return G.sortPriority-F.sortPriority})}var t=EventType.getInstanceOf(s);var y=0;var w=false;while(n!=null&&n.length>0&&y<n.length){var E=n[y];y++;var A=p.find("[marketId="+k.replace(".","_")+"][popSelectionItem="+E.selectionId+"]");var u=SelectionUtil.isShowSelection(E.closeSite,E.bookMode,PageConfig.webSiteType);var C=GameProductUtils.isClose(B)||SelectionUtil.isShowSuspend(E.suspendSite,E.bookSuspend,PageConfig.webSiteType);if(A.length==0){if(!u){continue}if(t.isRacingEvent()){if(!SelectionUtil.isActive(E.status)&&!SelectionUtil.isRemoved(E.status)&&!SelectionUtil.isRemovedVacant(E.status)&&!SelectionUtil.isHidden(E.status)){continue}}else{if(!SelectionUtil.isActive(E.status)){continue}}w=true;var q="";q="<a onclick=\"window.open('market/marketDepth.jsp?eventId="+v+"&marketId="+k+"&selectionId="+E.selectionId+"','_blank','resizable=no,width=920,height=600')\"><img class=\"icon-predict\" src=\"/images/transparent.gif\"/></a>";A=JsCache.clone("#selectionTemplate");A.attr("id","selection_"+E.selectionId);A.attr("eventType",s);A.attr("eventId",v);A.attr("marketId",k.replace(".","_"));A.attr("popSelectionItem",E.selectionId);A.find("#runner").html(q+E.runnerName+'<br /><span id="withoutBet" class="win" style="display: none;"></span><span id="lossWithoutBet" class="" style="display: none;"></span><span id="withBet" class="win" style="display: none;"></span><span id="lossWithBet" class="" style="display: none;"></span>');if(MarketUtil.isOpen(l)&&!MarketUtil.isSuspend(l)&&!MarketUtil.isClosed(l)){A.find(".btn-back").click(function(){BetHandler.clickBtn(this)});A.find(".btn-lay").click(function(){BetHandler.clickBtn(this)})}p.find("#moreLink").before(A.show())}else{if(!u){A.hide();continue}if(!A.is(":visible")){A.show()}if(t.isRacingEvent()){if(!SelectionUtil.isActive(E.status)&&!SelectionUtil.isRemoved(E.status)&&!SelectionUtil.isRemovedVacant(E.status)&&!SelectionUtil.isHidden(E.status)){A.hide();continue}}else{if(!SelectionUtil.isActive(E.status)){A.hide();continue}}}A.attr("eventName",o);var D="&nbsp;";if(E.availableToBack.length>0){D=E.availableToBack[0].price;SparkHandler.addSparkClass(A.find(".btn-back"),D,null)}var m="&nbsp;";if(E.availableToLay.length>0){m=E.availableToLay[0].price;SparkHandler.addSparkClass(A.find(".btn-lay"),m,null)}A.find(".btn-back").attr("selectionId",E.selectionId).attr("runner",E.runnerName).attr("marketName",r).html(D);A.find(".btn-lay").attr("selectionId",E.selectionId).attr("runner",E.runnerName).attr("marketName",r).html(m);A.find(".btn-back").attr("inPlay",z);A.find(".btn-lay").attr("inPlay",z);A.find(".btn-back").attr("marketType",x);A.find(".btn-lay").attr("marketType",x);if(C){A.find("#selectionSuspend").show()}else{A.find("#selectionSuspend").hide()}}if(w==true){BetHandler.getWinLoss(v,k);BetHandler.addSelectClass()}}function d(o,l){if(o==null){return}if(l==null||l.length==0){return}var m="";var k="";for(var n=0;n<l.length;n++){m+=(l[n]+",");var p=i.get(l[n]);if(p==null){p=-1}k+=(p+",")}$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.querySelectionsPath,data:{eventId:o,marketIds:m,selectionTsList:k},success:function(s){try{if(s.markets.length==0){return}var q=$j("#overWrap");for(var t=0;t<s.markets.length;t++){var r=s.markets[t];var z=r.marketId;DataBase.markets.update(r.eventId,[r]);if(i.get(z)!=null){i.put(z,r.selectionTs)}var x=q.find("#popMarketItem_"+z.replace(".","_"));if(x.length>0){b(s.eventType,s.eventId,s.eventName,z,r.marketName,r.status,r.selections,x,r.inPlay,r.marketType,s.gameProductStatus);var w=function(C,B){if(C.indexOf("-")==0){return"("+B.currencySymbol+C.replace("-","")+")"}return B.currencySymbol+C};var A={precision:0,separateSign:",",currencySymbol:PageConfig.currencySymbol==null?"$":PageConfig.currencySymbol,formatter:w,"trailingZeros,":false};var v=CurrencyUtil.formatter(r.totalMatched>0?r.totalMatched:0,A);var y="Matched: "+PageConfig.playerCurrencyType+" "+v;if(BetHandler.isEnableCheckLowLiquidity()){if(BetHandler.isLowLiquidity(s.eventType,o,z.replace("_","."))){FullMarketUtil.disableBetButton(x,true);FullMarketUtil.showLowLiquidityTag(x.find("#lowLiquidityTag"),true)}else{FullMarketUtil.disableBetButton(x,false);FullMarketUtil.showLowLiquidityTag(x.find("#lowLiquidityTag"),false)}x.find("#matched").contents().filter(function(){return this.nodeType==3}).remove();x.find("#lowLiquidityTag").after(y)}else{if(y!=x.find("#matched").html()){x.find("#matched").html(y)}}}}}catch(u){Trace.printStackTrace(u)}finally{}},error:function(q){Trace.error(" expandedMarketsOnUI: "+l);Trace.error(q)}})}PopularMarketHandler.updateMarkets=function(v){var H=$j("#overWrap");var w=H.find("[id^=popMarketItem_]");$j.each(w,function(I,J){J=$j(J);if(PageConfig.selectEventId!=J.attr("eventId")){J.remove()}});var y=DataBase.markets.queryByEvent(v);var B=DataBase.events.get(PageConfig.selectEventType,v);if(B==null){return}for(var u=0;u<y.length;u++){var l=y[u];var q=false;for(var C=0;C<B.markets.length;C++){var m=B.markets[C];if(l.marketId!=m.marketId){continue}m.status=l.status;m.totalMatched=l.totalMatched;m.inPlay=l.inPlay;m.updateDate=l.updateDate;m.version=l.version;m.closeSite=l.closeSite;if(l.status==3){continue}q=true;for(var p=0;p<l.selections.length;p++){var t=l.selections[p];var F=false;for(var A=0;A<m.selections.length;A++){var D=m.selections[A];if(t.selectionId==D.selectionId){F=true;m.selections[A]=t}}if(F==false){m.selections[m.selections.length]=t}}}if(q==false){B.markets[B.markets.length]=l}}B.markets.sort(function(J,I){var L=J.marketName;var K=I.marketName;return MarketHandler.sortRule(L,K,J.totalMatched,I.totalMatched,J.marketId,I.marketId)});var C=0;var s=0;var r=null;var o=PopularMarketHandler.getTabTypeByName(PopularMarketHandler.showPopName);if(o==null){return}while(B.markets!=null&&B.markets.length>0&&C<B.markets.length){r=B.markets[C];var G=MarketUtil.isCloseSite(r.closeSite,PageConfig.webSiteType);C++;var n=H.find("#popMarketItem_"+r.marketId.replace(".","_"));var k=$j("#listBoard").find("#naviMenu_"+r.marketId.replace(".","_"));if(G){if(n.length>0){n.hide()}if(k.length>0){k.hide()}continue}if((!PopularMarketHandler.isValidPopMarketType(r.marketType,o.marketTypes)&&PopularMarketHandler.showPopName!="other_markets")||(!PopularMarketHandler.isOtherMarkets(r.marketType)&&PopularMarketHandler.showPopName=="other_markets")||G){var n=H.find("#popMarketItem_"+r.marketId.replace(".","_"));if(n.length>0){n.hide()}continue}var x=null;if(MarketUtil.isClosed(r.status)){if(k.length>0){k.remove()}}else{if(!k.is(":visible")){k.show()}}x=H.find("#popMarketItem_"+r.marketId.replace(".","_"));if(PageConfig.selectMarketId==r.marketId){if(x.length>0){x.hide()}continue}if(x.length==0){if(MarketUtil.isClosed(r.status)||G){continue}x=JsCache.clone("#marketTemplate");x.attr("id","popMarketItem_"+r.marketId.replace(".","_"));x.attr("marketType",r.marketType);x.attr("eventId",B.id);x.attr("marketId",r.marketId);x.attr("totalMatched",r.totalMatched);x.attr("marketName",r.marketName);UiUtils.bindToExpand(x.find(".to-expand"));x.find(".to-expand").click(function(I){return function(){$this=$j(this);if($this.parent().parent().find(".game-list").find("dl").length==1){g(I);d(PageConfig.selectEventId,[I])}}}(r.marketId));MultiMarketsHandler.bindPinEvent(x,B.eventType,B.id,r.marketId);MultiMarketsHandler.checkIsMultiMarket(x.find("#multiMarketPin"),B.eventType,B.id,r.marketId)}else{x=H.find("#popMarketItem_"+r.marketId.replace(".","_"));x.show()}var E='<img class="icon-irun" src="/images/transparent.gif" />';s++;x.find("#marketName").html(r.marketName);if(r.inPlay==1){x.find("#marketName").html(r.marketName+" "+E);if(k.length>0){var z=k.find("#name").find("img");z.removeClass("icon-no_play");z.addClass("icon-in_play")}}else{if(k.length>0){var z=k.find("#name").find("img");z.removeClass("icon-in_play");z.addClass("icon-no_play")}}if(s>4){}else{g(r.marketId)}if(x.find("dl[popSelectionItem]").length!=0){if(MarketUtil.isOpen(r.status)&&!MarketUtil.isSuspend(r.status)&&!MarketUtil.isClosed(r.status)){x.find("#suspend").hide();x.find("#closed").hide()}else{if(MarketUtil.isSuspend(r.status)&&!MarketUtil.isClosed(r.status)){x.find("#suspend").show();x.find("#closed").hide()}else{if(MarketUtil.isClosed(r.status)){x.find("#suspend").hide();x.find("#closed").show()}}}}if(H.find("#popMarketItem_"+r.marketId.replace(".","_")).length==0){x.find("#moreLink").click(function(I,J){return function(){PageConfig.selectMarketId=J;location.href=PageConfig.landingPath+"/member/fullMarket?eventType="+I.eventType+"&eventId="+I.id+"&marketId="+J}}(B,r.marketId));if(s>4){x.addClass("close")}else{}if(s%2==1){JsCache.get("#fullMarketEventLeft").append(x.show())}else{JsCache.get("#fullMarketEventRight").append(x.show())}}}d(v,i.keySet())};PopularMarketHandler.reSortPopMarketItem=function(o){var q=$j("#overWrap");var l=q.find("[id^=popMarketItem_]");if(l.length==0||o==null||o==-1){return}l.sort(function(t,s){var x=$j(t);var v=$j(s);var y=x.attr("marketName");var u=v.attr("marketName");var r=parseFloat(x.attr("totalMatched"));var w=parseFloat(v.attr("totalMatched"));if(x.is(":visible")&&v.is(":visible")){return MarketHandler.sortRule(y,u,r,w,x.attr("marketId"),v.attr("marketId"))}if(x.is(":visible")){return -1}if(v.is(":visible")){return 1}});var p=0;var k=[];for(var m=0;m<l.length;m++){var n=q.find(l[m]);if(n==null||n.length==0||n.is(":hidden")){continue}p++;if(p>4){n.addClass("close")}else{k.push(n.attr("marketId"));n.removeClass("close")}if(p%2==1){JsCache.get("#fullMarketEventLeft").append(n)}else{JsCache.get("#fullMarketEventRight").append(n)}}d(o,k)};function e(k){var l=0;for(var m in k){var o=k[m];var n=MarketUtil.isCloseSite(o.closeSite,PageConfig.webSiteType);if(!MarketUtil.isClosed(o.status)&&!n){l++}}return l}})();