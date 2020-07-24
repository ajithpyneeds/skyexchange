if(typeof(PageConfig)=="undefined"){PageConfig={}}var InPlayPage={};(function(){InPlayPage.init=function(){if(location.hash==""){location.hash="#InPlay"}$j(window).bind("hashchange",function(){JsCache.get("#sportFilterContainer").hide();var s=location.hash;if(s==""){location.hash="#InPlay";location.reload();return}InPlayPage.route(s)});CompetitionsFilterHandler.init();SportFilterHandler.init();InPlayPage.route(location.hash)};InPlayPage.route=function(s){JsCache.get("#noDataDiv").hide();if(location.hash=="#InPlay"){InPlayPage.viewInPlay()}else{if(location.hash=="#Today"){InPlayPage.viewToday()}else{if(location.hash=="#Tomorrow"){InPlayPage.viewTomorrow()}}}if(PageConfig.ENABLE_ONE_CLICK_BET=="true"){OneClickBetHandler.show()}else{UiUtils.appendHeight()}};InPlayPage.viewInPlay=function(){location.hash="#InPlay";TabMenuHandler.updateSelect("tabMenu","menu_InPlay");TabMenuHandler.updateSelect("inPlayTab","inPlay");if(JsCache.get("#centerColumn").find("[id^=inPlayEventType_]").length>0){JsCache.get("#noDataDiv").hide()}var s=$j("#centerColumn").find("[id^=inPlayEventType_]");if(s.length>0){$j.each(s,function(u,t){t=$j(t);if(t.length>0&&t.find("[id^=event_]").length>0){t.show()}})}JsCache.get("#centerColumn").find('[id^="todayEvent_"]').hide();JsCache.get("#centerColumn").find('[id^="tomorrowEvent_"]').hide();JsCache.get("#loading").css("top","100px").show();setTimeout(function(){return function(){JsCache.get("#loading").hide()}}(),2000);PageConfig.highlightEventType=-1;PageConfig.prefix="inPlayEvent_";$j("#sportFilter").hide();inPlayEventTs=-1;inPlaySelectionTs=-1;p();b();q()};InPlayPage.viewToday=function(){$j("#noDataDiv").nextAll().remove();TabMenuHandler.updateSelect("tabMenu","menu_InPlay");TabMenuHandler.updateSelect("inPlayTab","today");if(JsCache.get("#centerColumn").find("[id^=todayEvent_]").length>0){JsCache.get("#noDataDiv").hide()}JsCache.get("#centerColumn").find("[id^=inPlayEventType_]").hide();JsCache.get("#centerColumn").find("[id^=todayEvent_]").show();JsCache.get("#centerColumn").find("[id^=tomorrowEvent_]").hide();PageConfig.highlightEventType=-1;PageConfig.prefix="todayEvent_";$j("#sportFilter").show();var s=DataBase.todayEvents.queryAll();if(s.length==0){JsCache.get("#loading").css("top","100px").show();setTimeout(function(){return function(){JsCache.get("#loading").hide()}}(),2000)}s.sort(k);c(s,"todayEvent_");a();r();q();location.hash="#Today"};InPlayPage.viewTomorrow=function(){$j("#noDataDiv").nextAll().remove();TabMenuHandler.updateSelect("tabMenu","menu_InPlay");TabMenuHandler.updateSelect("inPlayTab","tomorrow");if(JsCache.get("#centerColumn").find("[id^=tomorrowEvent_]").length>0){JsCache.get("#noDataDiv").hide()}JsCache.get("#centerColumn").find("[id^=inPlayEventType_]").hide();JsCache.get("#centerColumn").find("[id^=todayEvent_]").hide();JsCache.get("#centerColumn").find("[id^=tomorrowEvent_]").show();PageConfig.highlightEventType=-1;PageConfig.prefix="tomorrowEvent_";$j("#sportFilter").show();var s=DataBase.tomorrowEvents.queryAll();if(s.length==0){JsCache.get("#loading").css("top","100px").show();setTimeout(function(){return function(){JsCache.get("#loading").hide()}}(),2000)}s.sort(k);c(s,"tomorrowEvent_");g();r();b();location.hash="#Tomorrow"};inPlayEventTs=-1;inPlaySelectionTs=-1;todayEventTs=-1;tomorrowEventTs=-1;var o=null;var i=null;var n=null;function p(){if(o==null){o=TaskExecuter.createTask(PageConfig.getInPlayEventsTaskCycleTime,1,function(){f(this)})}else{o.isStop=false}o.run();TaskExecuter.execute()}function a(){if(i==null){i=TaskExecuter.createTask(PageConfig.getTodayEventsTaskCycleTime,1,function(){h(this)})}else{i.isStop=false}i.run();TaskExecuter.execute()}function g(){if(n==null){n=TaskExecuter.createTask(PageConfig.getTomorrowEventsTaskCycleTime,1,function(){m(this)})}else{n.isStop=false}n.run();TaskExecuter.execute()}function r(){if(o!=null){o.stop()}}function b(){if(i!=null){i.stop()}}function q(){if(n!=null){n.stop()}}function f(s){if(location.hash!="#InPlay"){s.check();TaskExecuter.execute();return}var u="";var w=[];JsCache.get("#centerColumn").find("[id^=inPlayEventType_]").each(function(){w[w.length]=$j(this)});for(var t=0;t<w.length;t++){var v=w[t];v.find("#inplayGameList").find("[id^=event_]:visible").each(function(){if(u==""){u+=this.id.replace("event_","")}else{u+=(","+this.id.replace("event_",""))}})}$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryEventsPath,data:{type:"inplay",eventTs:inPlayEventTs,marketTs:-1,selectionTs:inPlaySelectionTs,collectEventIds:u,eventType:-1},success:function(x){try{setTimeout(function(){return function(){JsCache.get("#loading").hide()}}(),250);if(x.eventTs>inPlayEventTs){inPlayEventTs=x.eventTs}if(x.selectionTs>inPlaySelectionTs){inPlaySelectionTs=x.selectionTs}var y=j(x.events);if(y.length>0||$j("#centerColumn").find("[id^=inPlayEventType_] :visible").length>0){JsCache.get("#noDataDiv").hide()}else{JsCache.get("#noDataDiv").show()}DataBase.events.update(x.events);e(x.events,x.gameProductStatus)}catch(z){Trace.printStackTrace(z)}finally{s.check();TaskExecuter.execute()}},error:function(x){s.check();TaskExecuter.execute()}})}function d(){var v=$j("input[name=sportsFilter]:checked");var t=[];for(var s=0;s<v.length;s++){var u=v.get(s).value;t.push(u);if(u==-1){break}}return t.join()}function h(s){d();if(location.hash!="#Today"){s.check();TaskExecuter.execute();return}$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryEventsPath,data:{type:"today",eventTs:todayEventTs,marketTs:-1,eventType:d(),selectionTs:inPlaySelectionTs},success:function(u){try{if(u.eventTs>todayEventTs){todayEventTs=u.eventTs}var v=j(u.events);if(v.length>0||$j("#centerColumn").find("[id^=todayEvent_] :visible").length>0){JsCache.get("#noDataDiv").hide()}else{JsCache.get("#noDataDiv").show()}DataBase.events.update(u.events);DataBase.todayEvents.update(u.events);var t=DataBase.todayEvents.queryAll();setTimeout(function(){return function(){JsCache.get("#loading").hide()}}(),2000);u.events.sort(k);c(u.events,"todayEvent_")}finally{s.check();TaskExecuter.execute()}},error:function(){s.check();TaskExecuter.execute()}})}function m(s){if(location.hash!="#Tomorrow"){s.check();TaskExecuter.execute();return}$j.ajax({type:"POST",dataType:"JSON",url:PageConfig.queryEventsPath,data:{type:"tomorrow",eventTs:tomorrowEventTs,marketTs:-1,eventType:d(),selectionTs:inPlaySelectionTs},success:function(t){try{if(t.eventTs>tomorrowEventTs){tomorrowEventTs=t.eventTs}var u=j(t.events);if(u.length>0||$j("#centerColumn").find("[id^=tomorrowEvent_] :visible").length>0){JsCache.get("#noDataDiv").hide()}else{JsCache.get("#noDataDiv").show()}DataBase.events.update(t.events);DataBase.tomorrowEvents.update(t.events);var v=DataBase.tomorrowEvents.queryAll();setTimeout(function(){return function(){JsCache.get("#loading").hide()}}(),2000);t.events.sort(k);c(t.events,"tomorrowEvent_")}finally{s.check();TaskExecuter.execute()}},error:function(){s.check();TaskExecuter.execute()}})}function k(t,s){var v=t.openDateTime.toString();var u=s.openDateTime.toString();if(v.localeCompare(u)==0){if(t.eventType==s.eventType){if(t.competitionName.localeCompare(s.competitionName)==0){return t.name.localeCompare(s.name)}return t.competitionName.localeCompare(s.competitionName)}var x=I18N.get("eventType.name."+EventType.getInstanceOf(t.eventType).name);var w=I18N.get("eventType.name."+EventType.getInstanceOf(s.eventType).name);return x.localeCompare(w)}return v.localeCompare(u)}var c=function(s,I,x){if((location.hash=="#Today"&&I!="todayEvent_")||(location.hash=="#Tomorrow"&&I!="tomorrowEvent_")){return}if(x==null){x=0}var u=new Date().getTime();var B=u;var C=null;for(var K=x;K<s.length;K++){if((new Date().getTime()-u)>50){setTimeout(function(){c(s,I,K)},0);break}var J=s[K];var z=(((J.openDateTime-B)/60000)+"").split(".")[0];var y=J.markets[0];if(y==null){continue}if(J.name=="QuickBets"){continue}if(parseInt(z)<15){continue}var M=(EventUtils.isCloseSite(J.closeSite,PageConfig.webSiteType)||MarketUtil.isCloseSite(y.closeSite,PageConfig.webSiteType)||CompetitionUtils.isCloseSite(J.competitionCloseSite,PageConfig.webSiteType));C=$j("#"+I+J.id+y.marketDateTime);if(C.length==0){if(M){continue}C=JsCache.clone("#gameListTemplate");C.attr("id",I+J.id+y.marketDateTime);C.attr("eventType",J.eventType);C.attr("openDateTime",y.marketTime);JsCache.get("#sportListWrap").append(C)}else{if(M){C.remove();continue}}var F=y.marketTime.split(" ");var E=F[1];C.find("#openTime").html(E);var D="--";if(J.competitionId!=-1){if(J.competitionName!=null&&J.competitionName!=""&&J.competitionName!="null"){D=J.competitionName}}else{if(J.countryCode!=null&&J.countryCode!=""&&J.countryCode!="null"){D=J.countryCode}}var H=J.name;var L="";if(H.indexOf(" @ ")>0){L=" @ "}else{if(H.indexOf(" v ")>0){L=" v "}else{if(H.indexOf(" vs ")>0){L=" vs "}}}if(L!=""){var w=H.split(L);H=w[0].trim()+"</strong>"+L+"<strong>"+w[1].trim()}var v=function(O,N){return function(){location.href=PageConfig.fullMarketPath+"?eventType="+O.eventType+"&eventId="+O.id+"&marketId="+N.marketId}}(J,y);var G='<a id="vsNameClick"><strong>'+H+"</strong></a>";var A=I18N.get("eventType.name."+EventType.getInstanceOf(J.eventType).name);var t=A+'<img class="fromto" src="/images/transparent.gif" />'+D+'<img class="fromto" src="/images/transparent.gif" />'+G;C.find("#eventDetail").html(t);C.find("#vsNameClick").click(v);if(location.hash!="#Today"&&location.hash!="#Tomorrow"){C.hide();break}}if(s.length>0&&C==null){JsCache.get("#noDataDiv").show()}JsCache.get("#sportListWrap").find("dl").each(function(){var O=$j(this);var P=O.attr("openDateTime");var N=(((P-B)/60000)+"").split(".")[0];if(parseInt(N)<15){O.remove()}else{}});SportFilterHandler.filter()};function e(w,B){if(location.hash!="#InPlay"){return}w.sort(function(H,G){return I18N.get("eventType.name."+EventType.getInstanceOf(H.eventType).name).localeCompare(I18N.get("eventType.name."+EventType.getInstanceOf(G.eventType).name))});var s=-1;var v=null;var A=0;var t=0;var F=null;for(var C=0;C<w.length;C++){var u=w[C];if(u.markets==null||u.markets.length==0){continue}if(u.markets.length==0){continue}else{if(u.markets[0].selections.length==0&&!u.isManualEvent){continue}}DataBase.markets.update(u.id,u.markets);t++;if(s!=u.eventType){if(s!=-1&&F.length>0){F.sort(function(H,G){return H.name.localeCompare(G.name)});var E=F;var y=v;var z={groupOfEvents:E,gameWrap:y,run:function(){var G=this;l(G,B)}};setTimeout(function(G,H){return function(){G.run()}}(z,A),100+100*A)}A++;t=0;F=[];var x=$j("#inPlayEventType_"+u.eventType);if(x.length==1){v=x}else{v=JsCache.clone("#gameWrapTemplate");UiUtils.bindToExpand(v.find(".to-expand"));$j("#contentBox").before(v)}v.attr("id","inPlayEventType_"+u.eventType);v.find("#eventType").html(I18N.get("eventType.name."+EventType.getInstanceOf(u.eventType).name));s=u.eventType}if(v==null){continue}if(A>=4){}if(t>=10){}F[F.length]=u}if(F!=null&&F.length>0&&v!=null){try{F.sort(EventHandler.sortEvents);var E=F;var y=v;var z={groupOfEvents:E,gameWrap:y,run:function(){var G=this;l(G,B)}};setTimeout(function(G,H){return function(){G.run();JsCache.get("#loading").hide()}}(z,A),2000)}catch(D){Trace.error(D)}}}var l=function(U,M){if(location.hash!="#InPlay"){return}try{var J=new Date().getTime();try{var L=0;if(U.startIdx!=null){L=U.startIdx}for(var ai=L;ai<U.groupOfEvents.length;ai++){var af=new Date().getTime();if(af-J>100){U.startIdx=ai;setTimeout(function(al){return function(){l(al,M)}}(U),100);return}var ak=U.groupOfEvents[ai];if(ak.markets.length>0){if(ak.markets[0].status==3){if($j("#event_"+ak.id).length==1){$j("#event_"+ak.id).remove()}continue}}if(ak.markets==null||ak.markets.length==0){continue}var ah=ak.markets[0];var C=af+(15*60*1000);if(ah.marketDateTime>C){continue}if(!ak.isManualEvent&&(ah.selections==null||ah.selections.length==0)){continue}if(ak.eventType==EventType.TENNIS.value||ak.eventType==EventType.CRICKET.value||ak.eventType==EventType.RUGBY_UNION.value||ak.eventType==EventType.BASEBALL.value||ak.eventType==EventType.BASKETBALL.value){if(ah.marketType!="MATCH_ODDS"&&ah.marketType!="SUPER_OVER"){continue}}var v=EventType.getInstanceOf(ak.eventType);if(v.isRacingEvent()){if(ah.marketType!="WIN"&&ah.marketType!="PLACE"){continue}}var W=(EventUtils.isCloseSite(ak.closeSite,PageConfig.webSiteType)||MarketUtil.isCloseSite(ah.closeSite,PageConfig.webSiteType)||CompetitionUtils.isCloseSite(ak.competitionCloseSite,PageConfig.webSiteType));var V=ak.name;var K=EventType.getInstanceOf(ak.eventType);var I=null;var aa=U.gameWrap.find("#event_"+ak.id);if(aa.length==1){if(W){aa.remove();continue}I=aa;var aj="";if(K.isTwoTeamsEvent()){if(ah.inPlay==1){var B=" v ";if(ak.name.indexOf(" vs ")>0){B=" vs "}else{if(ak.name.indexOf(" @ ")>0){B=" @ "}}var X=ak.name.split(B);if(X.length==1){continue}var P="";var H="";for(var ad=0;ad<ah.selections.length;ad++){var E=ah.selections[ad];if(E.sortPriority==1){P=E.runnerName}else{if(E.sortPriority==2){H=E.runnerName}}if(P!=""&&H!=""){break}}if(P!=""&&H!=""){V=P+"<span>"+B.trim()+"</span>"+H}else{P=X[0];H=X[1];V=X[0]+"<span>"+B.trim()+"</span>"+X[1]}aj=EventHandler.getScoreInfo(ak,P,H);V=P+aj+H;I.find("#vsName").html(V)}}}else{if(W){continue}I=JsCache.clone("#eventTemplate");I.attr("id","event_"+ak.id);if(ak.eventType==EventType.SOCCER.value){if(PageConfig.checkedFilterCompetitions==null){U.gameWrap.find("#inplayGameList").append(I.show())}else{var F=false;for(atr in PageConfig.checkedFilterCompetitions){if(PageConfig.checkedFilterCompetitions[atr]==ak.competitionId){F=true;break}}if(F){U.gameWrap.find("#inplayGameList").append(I.show())}else{U.gameWrap.find("#inplayGameList").append(I.hide())}}}else{U.gameWrap.find("#inplayGameList").append(I.show())}if(!EventType.getInstanceOf(ak.eventType).hasDraw()){U.gameWrap.removeClass("col3");U.gameWrap.find(".col-draw").hide()}else{U.gameWrap.addClass("col3");U.gameWrap.find(".col-draw").show()}I.attr("eventType",ak.eventType);I.attr("competitionId",ak.competitionId);I.attr("eventId",ak.id);I.attr("marketId",ah.marketId);I.attr("openDate",ak.openDate);I.attr("openDateTime",ak.openDateTime);I.attr("elapsedTime",ak.elapsedTime);I.attr("inPlay",ah.inPlay);var R=EventHandler.getEventDisplayName(ak,ah,I);var S=function(am,al){return function(){location.href=PageConfig.fullMarketPath+"?eventType="+am.eventType+"&eventId="+am.id+"&marketId="+al.marketId}}(ak,ah);I.find("#eventInfo").click(S);I.attr("eventName",ak.name);I.find("#vsName").html(R);MultiMarketsHandler.bindPinEvent(I,ak.eventType,ak.id,ah.marketId);MultiMarketsHandler.checkIsMultiMarket(I.find("#multiMarketPin"),ak.eventType,ak.id,ah.marketId);var z=false;var Q=false;if(BetHandler.isEnableCheckLowLiquidity()){if(BetHandler.isLowLiquidity(ak.eventType,ak.id,ah.marketId.replace("_","."))){Q=true}}var w=ah.disableBettingSite;if(WebSiteUtil.isDisableBettingSite(w,PageConfig.webSiteType)){z=true}if(WebSiteUtil.isDisableBettingSite(ah.autoDisableBettingSite,PageConfig.webSiteType)){z=true}if(z||Q){I.addClass("disabled")}else{if(!I.hasClass("cooldown")){I.removeClass("disabled")}}if(FancyBetMarketHandler.isEnableFancyBet()&&ak.hasFancyBetMarkets){I.find("#fancyBetIcon").show().css("display","inline-flex");if(ak.hasInPlayFancyBetMarkets){I.find("span").addClass("in-play")}else{I.find("span").removeClass("in-play")}}else{I.find("#fancyBetIcon").hide()}if(BookMakerMarketHandler.isEnableBookMaker()&&ak.hasBookMakerMarkets){var y=I.find("#bookMakerIcon");y.show().css("display","inline-flex");if(ak.hasInPlayBookMakerMarkets){y.addClass("in-play")}else{y.removeClass("in-play")}}else{I.find("#bookMakerIcon").hide()}if(FeedingSiteMarketHandler.isEnableFeedingSiteBet()&&ak.hasFeedingSiteMarkets){I.find("#feedingSiteIcon").show()}else{I.find("#feedingSiteIcon").hide()}if(SportsBookEventHandler.isEnableSportsBookBet()&&ak.hasSportsBookMarkets){I.find("#sportsBookIcon_"+ApiSiteType.SPORTRADAR.unique()).show().css("display","inline-flex")}if(SportsBookEventHandler.isEnableOwSportsBookBet()&&ak.hasOwSportsBookMarkets){I.find("#sportsBookIcon_"+ApiSiteType.OW.unique()).show().css("display","inline-flex")}if(!ak.hasSportsBookMarkets&&!ak.hasOwSportsBookMarkets){I.find("#sportsBookIcon_"+ApiSiteType.OW.unique()).hide()}if(ak.isElectronic==1){I.find("#sportsBookEIcon_"+ak.eventType).show().css("display","inline-flex")}}if(ak.streamingChannel!=null&&ak.streamingChannel.length!=0&&ak.streamingChannel!=0){I.find("#streamingIcon").show().css("display","inline-flex")}else{I.find("#streamingIcon").hide()}U.gameWrap.show();if(ah.inPlay!=null&&ah.inPlay==1){I.find("#playIcon").removeClass("icon-no_play");I.find("#playIcon").addClass("icon-in_play")}if(ak.isInPlay!=null&&ak.isInPlay==1){EventHandler.updateEventCountdown(ak,ah,I)}if(MarketUtil.isSuspend(ah.status)){I.find(".suspend").show();continue}I.find(".suspend").hide();if(aa.length==0){EventHandler.bindEvent(I)}var s=ah.marketType;if(s==null){s=ah.marketName}ah.selections.sort(function(am,al){return am.sortPriority-al.sortPriority});for(var ad=0;ad<ah.selections.length;ad++){var E=ah.selections[ad];var x=SelectionUtil.isShowSelection(E.closeSite,E.bookMode,PageConfig.webSiteType);var ac=GameProductUtils.isClose(M)||SelectionUtil.isShowSuspend(E.suspendSite,E.bookSuspend,PageConfig.webSiteType);var N=E.isAutoSuspend==1;var ab="";if(E.sortPriority==1){ab=".col-visit"}else{if(E.sortPriority==2){ab=".col-home"}else{if(E.sortPriority==3){ab=".col-draw"}else{continue}}}var Z=I.find(ab+" > a");if(Z.length==0){continue}if(!x){Z.hide();continue}else{Z.show()}if(ac){Z.parent().find(".suspend").show();continue}else{Z.parent().find(".suspend").hide()}if(N){I.find(ab).addClass("disabled")}else{I.find(ab).removeClass("disabled")}var Y=$j(Z[0]);var u=$j(Z[1]);Y.attr("selectionId",E.selectionId);Y.attr("runner",E.runnerName);Y.attr("marketName",ah.marketName);Y.attr("inPlay",ah.inPlay);u.attr("selectionId",E.selectionId);u.attr("runner",E.runnerName);u.attr("marketName",ah.marketName);u.attr("inPlay",ah.inPlay);if(E.availableToBack.length>0){Y.html(E.availableToBack[0].price);SparkHandler.addSparkClass(Y,E.availableToBack[0].price,E.availableToBack[0].size)}else{Y.html("&nbsp;")}if(E.availableToLay.length>0){u.html(E.availableToLay[0].price);SparkHandler.addSparkClass(u,E.availableToLay[0].price,E.availableToLay[0].size)}else{u.html("&nbsp;")}}}var ae=U.gameWrap.find("#inplayGameList").find("[id^=event_]:visible");if(ae.length>0){}else{U.gameWrap.hide()}var t=-1;if(U.groupOfEvents.length>0){t=U.groupOfEvents[0].eventType}if(t!=-1&&!EventType.getInstanceOf(t).hasDraw()){U.gameWrap.removeClass("col3");U.gameWrap.find(".col-draw").hide()}else{U.gameWrap.addClass("col3");U.gameWrap.find(".col-draw").show()}if(EventType.SOCCER.value==U.groupOfEvents[0].eventType){CompetitionsFilterHandler.sortFilterContent();var T=U.gameWrap.find("#soccerCompetitionFilter");var A=T.find("#filterCheckBoxList");var D=A.find("li");D.sort(function(an,am){var aq=$j(an);var ap=$j(am);if(aq.attr("id")=="btn"){return 1}if(ap.attr("id")=="btn"){return -1}if(aq.find("input").attr("id")=="filter-all"){return -1}if(ap.find("input").attr("id")=="filter-all"){return 1}var ao=aq.find("label").html();var al=ap.find("label").html();return ao.localeCompare(al)});A.find("ul").append(D);CompetitionsFilterHandler.filter()}}catch(O){Trace.error(O)}var G=new Date().getTime();if(G-J>100){}BetHandler.addSelectClass()}catch(ag){Trace.error(ag)}};function j(u){var t=[];for(var s=0;s<u.length;s++){var v=u[s];var w=v.markets[0];if(w==null){continue}if(MarketUtil.isOpen(w.status)||MarketUtil.isSuspend(w.status)){t.push(w)}}return t}})();var CompetitionsFilterHandler={};(function(){CompetitionsFilterHandler.init=function(){PageConfig.checkedFilterCompetitions=null;var a=CookieUtil.getCookie("filterCompetitions_"+PageConfig.userID);if(a!=null){try{PageConfig.checkedFilterCompetitions=JSON.parse(a)}catch(b){Trace.error(b);CookieUtil.deleteCookie(CookieUtil.getCookie("filterCompetitions_"+PageConfig.userID))}}};CompetitionsFilterHandler.sortFilterContent=function(){var a=$j("#soccerCompetitionFilter").find(".filter-content");var b=a.find("span");b.sort(function(d,c){var f=$j(d);var e=$j(c);f.removeClass("filter-first");e.removeClass("filter-first");var g=f.html().localeCompare(e.html());if(f.css("display")==="none"&&e.css("display")==="none"){return g}if(f.css("display")==="none"){return 1}if(e.css("display")==="none"){return -1}return g});$j(b[0]).addClass("filter-first");a.append(b)};CompetitionsFilterHandler.filterPopup=function(){JsCache.get("#filterCheckBoxList").toggle();return};CompetitionsFilterHandler.checkAll=function(a){var b=$j("#soccerCompetitionFilter").find("#filter-all").prop("checked");if(a){if(b){b=false}else{b=true}}$j("#soccerCompetitionFilter").find('[name="competitionsFilter"]').each(function(){$j(this).prop("checked",b)})};CompetitionsFilterHandler.filter=function(){if(PageConfig.checkedFilterCompetitions!=null){$j("#inPlayEventType_1").find("[id^=event_]").hide();$j(PageConfig.checkedFilterCompetitions).each(function(e,f){$j("[id^=event_][competitionId="+f+"]").show()});var c=$j("#soccerCompetitionFilter");var d=c.find('[name="competitionsFilter"]').length;var a=c.find("input:checked").length;if(d==(a+1)){var b=c.find('[id="filter-all"]');if(!b.prop("checked")){b.prop("checked",true)}else{b.prop("checked",false)}}}};CompetitionsFilterHandler.revertCheckedSports=function(){try{if(PageConfig.checkedFilterCompetitions!=null){var b=JsCache.get("#filterCheckBoxList");b.find("input").prop("checked",false);$j(PageConfig.checkedFilterCompetitions).each(function(c,d){b.find("#filter-"+d).prop("checked",true)})}}catch(a){Trace.error(a)}};CompetitionsFilterHandler.updateFilter=function(){var b=JsCache.get("#soccerCompetitionFilter").find(".filter-content");var a=[];$j("#soccerCompetitionFilter").find('[name="competitionsFilter"]').each(function(){var d=$j(this);var c=d.val();if(d.prop("checked")){a[a.length]=c;b.find("#comp_"+c).show()}else{b.find("#comp_"+c).hide()}});CompetitionsFilterHandler.sortFilterContent();CookieUtil.setCookie("filterCompetitions_"+PageConfig.userID,JSON.stringify(a),-1);PageConfig.checkedFilterCompetitions=a;CompetitionsFilterHandler.filter()}})();var SportFilterHandler={};(function(){SportFilterHandler.init=function(){JsCache.get("#sportFilterPopup").click(function(e){SportFilterHandler.filterPopup(this);e.stopPropagation()});JsCache.get("#sportFilterSave").click(function(e){SportFilterHandler.updateFilter();JsCache.get("#sportFilterContainer").hide();$j("#noDataDiv").nextAll().remove();if(location.hash=="#Today"){todayEventTs=-1}else{if(location.hash=="#Tomorrow"){tomorrowEventTs=-1}}e.stopPropagation()});JsCache.get("#sportFilterCancel").click(function(e){SportFilterHandler.revertCheckedSports();JsCache.get("#sportFilterContainer").hide();e.stopPropagation()});var c=JsCache.get("#sportFilter").find(".filter-content");PageConfig.checkedFilterSports=null;var d=CookieUtil.getCookie("filterSports_"+PageConfig.userID);var h=JsCache.get("#sportFilterContainer");if(d!=null){try{PageConfig.checkedFilterSports=JSON.parse(d);if(PageConfig.checkedFilterSports!=null){$j(PageConfig.checkedFilterSports).each(function(e,i){h.find("#filter-"+i).prop("checked",true);c.find("#sport_"+i).show()})}}catch(g){Trace.error(g);CookieUtil.deleteCookie(CookieUtil.getCookie("filterSports_"+PageConfig.userID))}}else{var b=[0];h.find("#filter-all").prop("checked",true);for(atr in EventType){var f=EventType[atr];if(f.value!=undefined){b[b.length]=f.value;h.find("#filter-"+f.value).prop("checked",true);c.find("#sport_"+f.value).show()}}CookieUtil.setCookie("filterSports_"+PageConfig.userID,JSON.stringify(b),999);PageConfig.checkedFilterSports=b}a()};function a(){var b=JsCache.get("#sportFilter").find(".filter-content");var c=b.find("span");c.sort(function(e,d){var g=$j(e);var f=$j(d);g.removeClass("filter-first");f.removeClass("filter-first");var h=g.html().localeCompare(f.html());if(g.css("display")==="none"&&f.css("display")==="none"){return h}if(g.css("display")==="none"){return 1}if(f.css("display")==="none"){return -1}return h});$j(c[0]).addClass("filter-first");b.append(c)}SportFilterHandler.filterPopup=function(){JsCache.get("#sportFilterContainer").toggle();return};SportFilterHandler.checkAll=function(){var c=JsCache.get("#sportFilterContainer");var b=c.find('[name="sportsFilter"][id="filter-all"]').prop("checked");c.find('[name="sportsFilter"]').each(function(){$j(this).prop("checked",b)})};SportFilterHandler.filter=function(){var d=0;if(PageConfig.checkedFilterSports!=null){var c=JsCache.get("#sportListWrap").find("[id^="+PageConfig.prefix+"]");c.hide();$j(PageConfig.checkedFilterSports).each(function(i,j){var h=JsCache.get("#sportListWrap").find("[id^="+PageConfig.prefix+"][eventType="+j+"]");h.show();d+=h.length;if(d>0){JsCache.get("#noDataDiv").hide()}});var f=JsCache.get("#sportFilterContainer");var g=f.find('[name="sportsFilter"]').length;var b=f.find("input:checked").length;if(g==(b+1)){var e=f.find('[name="sportsFilter"][id="filter-all"]');if(!e.prop("checked")){e.prop("checked",true)}else{e.prop("checked",false)}}}};SportFilterHandler.revertCheckedSports=function(){try{if(PageConfig.checkedFilterSports!=null){var c=JsCache.get("#sportFilterContainer");c.find("input").prop("checked",false);$j(PageConfig.checkedFilterSports).each(function(d,e){c.find("#filter-"+e).prop("checked",true)})}}catch(b){Trace.error(b)}};SportFilterHandler.updateFilter=function(){var c=JsCache.get("#sportFilter").find(".filter-content");var b=[];JsCache.get("#sportFilterContainer").find('[name="sportsFilter"]').each(function(){var e=$j(this);var d=e.val();if(e.prop("checked")){b[b.length]=d;c.find("#sport_"+d).show()}else{c.find("#sport_"+d).hide()}});a();CookieUtil.setCookie("filterSports_"+PageConfig.userID,JSON.stringify(b),999);PageConfig.checkedFilterSports=b;SportFilterHandler.filter();if(JsCache.get("#centerColumn").find("[id^="+PageConfig.prefix+"]:visible").length==0){JsCache.get("#noDataDiv").show()}}})();if(typeof(DataBase)=="undefined"){DataBase={}}(function(){DataBase.todayEvents={};var a=new TreeMap();DataBase.todayEvents.update=function(f){var e=a;for(var c=0;c<f.length;c++){var d=f[c];e.put(d.id,d)}};DataBase.todayEvents.get=function(c){return a.get(c)};DataBase.todayEvents.queryAll=function(){return a.values()};DataBase.tomorrowEvents={};var b=new TreeMap();DataBase.tomorrowEvents.update=function(f){var e=b;for(var c=0;c<f.length;c++){var d=f[c];e.put(d.id,d)}};DataBase.tomorrowEvents.get=function(c){return b.get(c)};DataBase.tomorrowEvents.queryAll=function(){return b.values()}})();