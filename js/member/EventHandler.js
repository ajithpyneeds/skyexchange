if(typeof(EventHandler)=="undefined"){EventHandler={}}(function(){EventHandler.getEventsTask=null;EventHandler.initGetEventsTask=function(){EventHandler.getEventsTask=TaskExecuter.createTask(PageConfig.getEventsTaskCycleTime,0,function(){a(this)});EventHandler.getEventsTask.run();TaskExecuter.execute()};EventHandler.updateCountdownTask=null;EventHandler.initUpdateCountdownTask=function(){EventHandler.updateCountdownTask=TaskExecuter.createTask(PageConfig.updateCountdownCycleTime,0,function(){c(this)});EventHandler.updateCountdownTask.run();TaskExecuter.execute()};function c(f){try{var d=JsCache.get("#eventBoard").find("[id^=highLightEvent_]");if(d.length>0){d.each(function(){var j=$j(this);var i=DataBase.events.get(j.attr("eventType"),j.attr("eventId"));if(i!=null&&i.isInPlay!=null&&i.isInPlay==1){var k=null;for(var e=0;e<i.markets.length;e++){if(i.markets[e].isHighLight==1){k=i.markets[e];break}}if(k!=null&&k.inPlay==1){EventHandler.updateEventCountdown(i,k,j)}}})}var g=$j("#centerColumn");if(g.hasClass("inplay")){g.find("[id^=inPlayEventType_]").each(function(){var e=$j(this);e.find("#inplayGameList").find("dl").each(function(){var k=$j(this);var j=DataBase.events.get(k.attr("eventType"),k.attr("eventId"));if(j!=null&&j.isInPlay!=null&&j.isInPlay==1){var l=null;for(var i=0;i<j.markets.length;i++){if(j.markets[i].isHighLight==1){l=j.markets[i];break}}if(l!=null){EventHandler.updateEventCountdown(j,l,k)}}})})}}catch(h){Trace.printStackTrace(h)}finally{f.check();TaskExecuter.execute()}}EventHandler.eventTsMap=new TreeMap();EventHandler.marketTsMap=new TreeMap();EventHandler.selectionTsMap=new TreeMap();function a(f){if((location.hash!="#Home"&&(PageConfig.highlightEventType==-1))||location.href.indexOf("#eventId#")!=-1||location.href.indexOf("#marketId#")!=-1){f.check();TaskExecuter.execute();return}var g=PageConfig.highlightEventType;var j=PageConfig.selectEventType;var e=EventHandler.eventTsMap.get(g);if(e==null){e=-1;EventHandler.eventTsMap.put(g,e)}var h=EventHandler.marketTsMap.get(g);if(h==null){h=-1;EventHandler.marketTsMap.put(g,h)}var d=EventHandler.selectionTsMap.get(g);if(d==null){d=-1;EventHandler.selectionTsMap.put(g,d)}var i="";JsCache.get("#eventBoard").find("[id^=highLightEvent_]").each(function(){if(i.length==0){i+=this.id.replace("highLightEvent_","")}else{i+=(","+this.id.replace("highLightEvent_",""))}});if(i!=""){JsCache.get("#noDataDiv").hide()}else{}$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryEventsWithMarketPath,data:{eventType:PageConfig.highlightEventType,competitionId:-1,eventTs:e,marketTs:h,selectionTs:d,collectEventIds:i},success:function(k){try{JsCache.get("#loading").hide();if(k.eventTs>e){EventHandler.eventTsMap.put(k.eventType,k.eventTs)}if(k.marketTs>h){EventHandler.marketTsMap.put(k.eventType,k.marketTs)}if(k.selectionTs>d){EventHandler.selectionTsMap.put(k.eventType,k.selectionTs)}if(k.eventTs>e||k.selectionTs>d){}if(k.events.length>0){JsCache.get("#noDataDiv").hide()}DataBase.events.update(k.events);EventHandler.updateEvents(k.gameProductStatus)}catch(l){Trace.printStackTrace(l)}finally{f.check();TaskExecuter.execute()}},error:function(){JsCache.get("#loading").hide();f.check();TaskExecuter.execute()}})}EventHandler.checkEvents=function(e,g,f,i){if(isNaN(e)||isNaN(g)){return}var h=DataBase.events.get(e,g);if(h==null||f){var d=this;$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryEventsWithMarketPath,data:{eventType:e,eventTs:-1,marketTs:-1,selectionTs:-1,eventId:g},success:function(j){try{if(j.events.length>0){DataBase.events.update(j.events)}}catch(k){Trace.printStackTrace(k)}finally{if(i!=null&&(typeof i==="function")){i.call(d)}}},error:function(){}});return}};function b(i,d){var g=new Date();var h=DateUtil.format(g,"yyyy-MM-dd");g.setDate(g.getDate()+1);var f=DateUtil.format(g,"yyyy-MM-dd");var e=i.marketTime.split("+")[0];e=e.replace("T"," ");e=e.replace(":00.000","");if(e.indexOf(h)>=0){e=e.replace(h," ")}else{if(e.indexOf(f)>=0){e=e.replace(f,"Tomorrow ")}else{}}d.find("#dateTimeInfo").html(e)}EventHandler.updateEvents=function(r){if(PageConfig.selectEventId!=-1){return}if(PageConfig.highlightEventType==-1&&PageConfig.selectEventType==-1){return}var G=null;var e=-1;if(PageConfig.selectEventType==-1){e=PageConfig.highlightEventType;G=DataBase.events.queryAll(PageConfig.highlightEventType)}else{e=PageConfig.selectEventType;G=DataBase.events.queryAll(PageConfig.selectEventType)}if(G==null){return}var F=0;$j("#moreEventLink").hide();if(PageConfig.highlightEventType!=EventType.SOCCER.unique()){G.sort(EventHandler.sortEvents)}var w=[];for(var C=0;C<G.length;C++){var R=G[C];if(R.isManualEvent&&R.isManualEventClosed){$j("#highLightEvent_"+R.id).remove();w.push(C);continue}if((R.status&16)>0||(R.status&48)>0){w.push(C);continue}if(CompetitionUtils.isCloseSite(R.competitionCloseSite,PageConfig.webSiteType)||EventUtils.isCloseSite(R.closeSite,PageConfig.webSiteType)){var v=$j("#highLightEvent_"+R.id);if(v.length==1){v.remove()}w.push(C);continue}if(R.markets.length>0){if(R.markets[0].status==3){if($j("#highLightEvent_"+R.id).length==1){$j("#highLightEvent_"+R.id).remove()}w.push(C);continue}}var M=$j("#moreEventLink");if(PageConfig.selectEventType==-1&&F>=20){M.unbind("click");var O="#";O="#"+I18N.get("eventType.name."+EventType.getInstanceOf(R.eventType).name);M.attr("href",O);M.click(function(i){return function(){MemberPage.selectSport(i)}}(R.eventType));M.show();break}else{M.hide()}if(F>=30){break}if(R.markets.length==0){w.push(C);continue}else{if(R.markets[0].selections.length==0&&!R.isManualEvent){w.push(C);continue}}var N=null;for(var E=0;E<R.markets.length;E++){if(R.markets[E].isHighLight==1||((R.markets[E].marketType=="EXTRA_TIME"||R.markets[E].marketType=="SUPER_OVER")&&!MarketUtil.isCloseSite(R.markets[E].closeSite,PageConfig.webSiteType))){N=R.markets[E];break}}if(N==null){w.push(C);continue}if(MarketUtil.isClosed(N.status)||MarketUtil.isCloseSite(N.closeSite,PageConfig.webSiteType)){$j("#highLightEvent_"+R.id).remove();w.push(C);continue}var p=null;if($j("#highLightEvent_"+R.id).length==0){p=$j("#eventTemplate").clone();var P=function(x,i){return function(){NavigationHandler.navigationIds=[];location.href=PageConfig.fullMarketPath+"?eventType="+x.eventType+"&eventId="+x.id+"&marketId="+i.marketId}}(R,N);p.find("#eventInfo").click(P);p.attr("id","highLightEvent_"+R.id);MultiMarketsHandler.bindPinEvent(p,R.eventType,R.id,N.marketId);MultiMarketsHandler.checkIsMultiMarket(p.find("#multiMarketPin"),R.eventType,R.id,N.marketId);if(FancyBetMarketHandler.isEnableFancyBet()&&R.hasFancyBetMarkets){p.find("#fancyBetIcon").show().css("display","inline-flex");if(R.hasInPlayFancyBetMarkets){p.find(".game-fancy").addClass("in-play")}else{p.find(".game-fancy").removeClass("in-play")}}else{p.find("#fancyBetIcon").hide()}if(BookMakerMarketHandler.isEnableBookMaker()&&R.hasBookMakerMarkets){var j=p.find("#bookMakerIcon");j.show().css("display","inline-flex");if(R.hasInPlayBookMakerMarkets){j.addClass("in-play")}else{j.removeClass("in-play")}}else{p.find("#bookMakerIcon").hide()}if(FeedingSiteMarketHandler.isEnableFeedingSiteBet()&&R.hasFeedingSiteMarkets){p.find("#feedingSiteIcon").show()}else{p.find("#feedingSiteIcon").hide()}if(SportsBookEventHandler.isEnableSportsBookBet()&&R.hasSportsBookMarkets){p.find("#sportsBookIcon_"+ApiSiteType.SPORTRADAR.unique()).show().css("display","inline-flex")}if(SportsBookEventHandler.isEnableOwSportsBookBet()&&R.hasOwSportsBookMarkets){p.find("#sportsBookIcon_"+ApiSiteType.OW.unique()).show().css("display","inline-flex")}if(!R.hasSportsBookMarkets&&!R.hasOwSportsBookMarkets){p.find("#sportsBookIcon_"+ApiSiteType.OW.unique()).hide()}if(R.isElectronic==1){p.find("#sportsBookEIcon_"+R.eventType).show().css("display","inline-flex")}}else{p=$j("#highLightEvent_"+R.id)}if(R.streamingChannel!=null&&R.streamingChannel.length!=0&&R.streamingChannel!=0){p.find("#streamingIcon").show().css("display","inline-flex")}else{p.find("#streamingIcon").hide()}var D=R.name;var q=EventType.getInstanceOf(R.eventType);if(q.isTwoTeamsEvent()){var l=" v ";if(R.name.indexOf(" vs ")>0){l=" vs "}else{if(R.name.indexOf(" @ ")>0){l=" @ "}}var H=R.name.split(l);if(H.length==1){w.push(C);continue}var A="";var o="";for(var L=0;L<N.selections.length;L++){var m=N.selections[L];if(m.sortPriority==1){A=m.runnerName}else{if(m.sortPriority==2){o=m.runnerName}}if(A!=""&&o!=""){break}}if(A!=""&&o!=""){D=A+"<span>"+l.trim()+"</span>"+o}else{A=H[0];o=H[1];D=H[0]+"<span>"+l.trim()+"</span>"+H[1]}if(N.inPlay==1){var Q=EventHandler.getScoreInfo(R,A,o);D=A+Q+o}}p.attr("eventType",R.eventType);p.attr("eventId",R.id);p.attr("marketId",N.marketId);p.attr("eventName",R.name);p.attr("openDate",R.openDate);p.attr("openDateTime",R.openDateTime);p.attr("elapsedTime",R.elapsedTime);p.attr("inPlay",N.inPlay);p.attr("priority",R.priority);p.find("#vsName").html(D);if(N.inPlay!=null&&N.inPlay==1){p.find("#playIcon").removeClass("icon-no_play");p.find("#playIcon").addClass("icon-in_play")}if(N.inPlay!=null&&N.inPlay==1){EventHandler.updateEventCountdown(R,N,p)}else{b(N,p)}if($j("#highLightEvent_"+R.id).length==0){EventHandler.bindEvent(p)}for(var L=0;L<N.selections.length;L++){var m=N.selections[L];var K="";if(m.sortPriority==1){K=".col-visit"}else{if(m.sortPriority==2){K=".col-home"}else{if(m.sortPriority==3){K=".col-draw"}else{w.push(C);continue}}}var J=p.find(K+" > a");if(J.length==0){w.push(C);continue}var I=$j(J[0]);var f=$j(J[1]);var y=I.prev();y.prop("id","suspend_"+R.id+"_"+m.selectionId);I.attr("selectionId",m.selectionId);I.attr("runner",m.runnerName);I.attr("marketName",N.marketName);I.attr("inPlay",N.inPlay);I.attr("marketType",N.marketType);f.attr("selectionId",m.selectionId);f.attr("runner",m.runnerName);f.attr("marketName",N.marketName);f.attr("inPlay",N.inPlay);f.attr("marketType",N.marketType);if(m.availableToBack.length>0){I.html(m.availableToBack[0].price);SparkHandler.addSparkClass(I,m.availableToBack[0].price,null)}else{I.html("&nbsp;")}if(m.availableToLay.length>0){f.html(m.availableToLay[0].price);SparkHandler.addSparkClass(f,m.availableToLay[0].price,null)}else{f.html("&nbsp;")}if(!SelectionUtil.isShowSelection(m.closeSite,m.bookMode,PageConfig.webSiteType)){$j("#highLightEvent_"+R.id).find("a#btnBack[selectionid="+m.selectionId+"]").hide();$j("#highLightEvent_"+R.id).find("a#btnLay[selectionid="+m.selectionId+"]").hide();w.push(C);continue}else{$j("#highLightEvent_"+R.id).find("a#btnBack[selectionid="+m.selectionId+"]").show();$j("#highLightEvent_"+R.id).find("a#btnLay[selectionid="+m.selectionId+"]").show()}if(MarketUtil.isSuspend(N.status)||SelectionUtil.isShowSuspend(m.suspendSite,m.bookSuspend,PageConfig.webSiteType)||GameProductUtils.isClose(r)){$j("#suspend_"+R.id+"_"+m.selectionId).show()}else{$j("#suspend_"+R.id+"_"+m.selectionId).hide()}if(m.isAutoSuspend==1){p.find(K).addClass("disabled")}else{p.find(K).removeClass("disabled")}}if($j("#highLightEvent_"+R.id).length==0){$j("#eventBoard").append(p.show());if(!EventType.getInstanceOf(R.eventType).hasDraw()){$j("#gameHighlightWrap").removeClass("col3");p.find(".col-draw").hide()}else{$j("#gameHighlightWrap").addClass("col3");p.find(".col-draw").show()}}F++;var k=false;var B=false;if(BetHandler.isEnableCheckLowLiquidity()){if(BetHandler.isLowLiquidity(R.eventType,R.id,N.marketId.replace("_","."))){B=true}}var h=N.disableBettingSite;if(WebSiteUtil.isDisableBettingSite(h,PageConfig.webSiteType)){k=true}if(WebSiteUtil.isDisableBettingSite(N.autoDisableBettingSite,PageConfig.webSiteType)){k=true}if(k||B){p.addClass("disabled")}else{if(!p.hasClass("cooldown")){p.removeClass("disabled")}}}var s=$j("#gameHighlightWrap");if(e!=-1&&!EventType.getInstanceOf(e).hasDraw()){s.removeClass("col3");s.find(".col-draw").hide()}else{s.addClass("col3");s.find(".col-draw").show()}BetHandler.addSelectClass();var d=$j("#eventBoard");var n=d.find("[id^=highLightEvent_]");var t=$j("#noDataDiv");if(n.length==0){t.show()}else{t.hide()}if(PageConfig.highlightEventType!=EventType.SOCCER.unique()){for(var L in w){var C=w[L];G.splice(C,1)}var z=G.map(function(i){return i.id});var g=n.length-1;var u=d.find(n[g]);if(z.length==n.length&&ArrayUtil.indexOf(z,parseInt(u.attr("eventId")))!=g){n.sort(EventHandler.sortEventsOnUI);d.append(n)}}};EventHandler.bindEvent=function(d){d.find("#btnBack").click(function(){if(PageConfig.ENABLE_QUICK_BET=="true"&&PageConfig.isOneClickBet==0){QuickBetUtil.appendBoard(this,d,SideType.Back.unique())}else{BetHandler.clickBtn(this)}});d.find("#btnLay").click(function(){if(PageConfig.ENABLE_QUICK_BET=="true"&&PageConfig.isOneClickBet==0){QuickBetUtil.appendBoard(this,d,SideType.Lay.unique())}else{BetHandler.clickBtn(this)}})};EventHandler.getScoreInfo=function(d,l,e){var k="<span>v</span>";if(d.name.indexOf(" vs ")>0){k="<span>vs</span>"}else{if(d.name.indexOf(" @ ")>0){k="<span>@</span>"}}if(d.scores!=null){var f=JSON.parse(d.scores);var h=f.home;var g=f.away;if(d.eventType==EventType.TENNIS.value){if(h.sets>0||h.games>0||g.games>0||g.sets>0){k='<span class="in_play">('+h.sets+") "+h.games+" - "+g.games+" ("+g.sets+")</span>"}}else{if(d.eventType==EventType.SOCCER.value||d.eventType==EventType.BASKETBALL.value){var j=0;var i=0;if(d.eventType==EventType.BASKETBALL.value){if(l!=null&&e!=null&&l.trim()==h.name.trim()&&e.trim()==g.name.trim()){j=h.score;i=g.score}else{j=g.score;i=h.score}}else{if(d.eventType==EventType.SOCCER.value){if(l!=null&&e!=null&&l.trim()==g.name.trim()&&e.trim()==h.name.trim()){j=g.score;i=h.score}else{j=h.score;i=g.score}}}if(h.score>=0||g.score>=0){k='<span class="in_play">'+j+" - "+i+"</span>"}}}}return k};EventHandler.getEventDisplayName=function(d,g,m){var k=d.name;var l=" v ";if(k.indexOf(" vs ")>0){l=" vs "}else{if(k.indexOf(" @ ")>0){l=" @ "}}var j=k.split(l);if(j.length==1){return d.name.trim()}var p="";var e="";var o="<span>"+l.trim()+"</span>";var f=EventType.getInstanceOf(d.eventType);if(f.isTwoTeamsEvent()){for(var h=0;h<g.selections.length;h++){var n=g.selections[h];if(n.sortPriority==1){p=n.runnerName}else{if(n.sortPriority==2){e=n.runnerName}else{continue}}}if(g.inPlay==1){o=EventHandler.getScoreInfo(d)}}if(p==""){p=j[0]}if(e==""){e=j[1]}m.attr("firstTeam",p);m.attr("secondTeam",e);k=p+o+e;return k};EventHandler.sortEventsOnUI=function(n,m){var e=$j(n);var p=$j(m);var h=e.attr("eventName");var l=p.attr("eventName");var g=e.attr("elapsedTime");var f=p.attr("elapsedTime");var i=0;if(g>f){i=-1}else{if(g<f){i=1}else{i=0}}var j=e.attr("openDateTime");var d=p.attr("openDateTime");var k=0;if(j>d){k=1}else{if(j<d){k=-1}else{k=0}}if(e.attr("inPlay")==1&&p.attr("inPlay")==1){}else{if(e.attr("inPlay")==1){return -1}else{if(p.attr("inPlay")==1){return 1}}}var o=h.localeCompare(l);if(i==0){if(k==0){return o}return k}return i};EventHandler.sortEvents=function(o,n){var h=o.name;var m=n.name;var g=o.elapsedTime;var f=n.elapsedTime;var j=0;if(g>f){j=-1}else{if(g<f){j=1}else{j=0}}var k=o.openDateTime;var d=n.openDateTime;var l=0;if(k>d){l=1}else{if(k<d){l=-1}else{l=0}}var e=o.markets.length==0?0:o.markets[0].inPlay;var i=n.markets.length==0?0:n.markets[0].inPlay;if(e==1&&i==1){}else{if(e==1){return -1}else{if(i==1){return 1}}}var p=h.localeCompare(m);if(j==0){if(l==0){return p}return l}return j};EventHandler.updateEventCountdown=function(j,k,d){var e="";var g=new Date().getTime();if(j.secondsToStart>=0||(k.inPlay!=null&&k.inPlay==1)){if(k.inPlay==null||k.inPlay==0){e="Starting soon"}else{if(EventUtils.isClose(j.status)&&EventUtils.isEnd(j.status)){if(j.inPlayStatus==null){j.inPlayStatus="FT"}e='<span class="in_play">'+j.inPlayStatus+"</span>"}else{if(j.inPlayStatus==null){j.inPlayStatus="In-Play"}if(j.elapsedTime>0){if(j.inPlayStatus=="HT"){e='<span class="in_play">'+j.inPlayStatus+"'</span>"}else{e='<span class="in_play">'+j.inPlayStatus+" "+j.elapsedTime+"'</span>"}}else{e='<span class="in_play">'+j.inPlayStatus+"</span>"}}}}else{var h=0;if(j.secondsPassed==null){j.secondsPassed=0;j.uiTs=g}else{h=((g-j.uiTs)/1000);j.secondsPassed=h}var f=(h+j.secondsToStart)/60;var i=((1+-1*f)+"").split(".")[0];if(i=="0"){e="Starting soon"}else{e="Starting in "+i+"' "}}d.find("#dateTimeInfo").html(e);if(e=="Starting soon"){d.find("#dateTimeInfo").addClass("game-list-soon").removeClass("game-list-time")}else{d.find("#dateTimeInfo").addClass("game-list-time").removeClass("game-list-soon")}}})();if(typeof(DataBase)=="undefined"){DataBase={}}(function(){DataBase.events={};var a=new TreeMap();DataBase.events.update=function(e){var d=null;for(var b=0;b<e.length;b++){var c=e[b];d=a.get(c.eventType);if(d==null){d=new TreeMap();a.put(c.eventType,d)}d.put(c.id,c);DataBase.markets.update(c.id,c.markets)}};DataBase.events.get=function(b,d){var c=a.get(b);if(c==null){return null}return c.get(d)};DataBase.events.queryAll=function(b){var c=a.get(b);if(c==null){c=new TreeMap();a.put(b,c)}return c.values()};DataBase.events.queryByCompetition=function(d,g){var c=DataBase.events.queryAll(d);var f=[];for(var b=0;b<c.length;b++){var e=c[b];if(e.competitionId==g){f[f.length]=e}}return f};DataBase.events.queryByCountryCode=function(e,b){var d=DataBase.events.queryAll(e);var g=[];for(var c=0;c<d.length;c++){var f=d[c];if(f.countryCode==b){g[g.length]=f}}return g};DataBase.events.sort=function(b){var c=a.get(b);if(c==null){return}c.sort(function(e,d){return e.value.openDateTime-d.value.openDateTime})}})();