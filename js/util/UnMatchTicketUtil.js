if(typeof(UnMatchTicketUtil)=="undefined"){UnMatchTicketUtil={}}(function(){UnMatchTicketUtil.isReady=function(a){return(a==UnMatchTicketStatusType.Ready.unique())};UnMatchTicketUtil.isProcessing=function(a){return(a==UnMatchTicketStatusType.Processing.unique())};UnMatchTicketUtil.isActive=function(a){return(a==UnMatchTicketStatusType.Active.unique())};UnMatchTicketUtil.isLapsed=function(a){return(a==UnMatchTicketStatusType.Lapsed.unique())};UnMatchTicketUtil.isDelete=function(a){return(a==UnMatchTicketStatusType.Delete.unique())};UnMatchTicketUtil.isShowKeepCancel=function(a){var b=EventType.getInstanceOf(a.eventType);return((EventType.SOCCER.unique()==b.unique()||(EventType.SOCCER.unique()!=b.unique()&&a.inPlay==0))&&a.persistenceEnabled==1&&a.turnInPlayEnabled==1&&"INNINGS_RUNS"!=a.marketType)};UnMatchTicketUtil.getPL=function(b,a){var c=MathUtil.decimal.subtract(MathUtil.decimal.multiply(parseFloat(b),parseFloat(a)),parseFloat(a));if(isNaN(c)){c=0}return c};UnMatchTicketUtil.validEditBetMin=function(g,d,f){var c=CurrencyType.getInstanceOf(f);if(c==null){return false}var b=c.editBetMin;var a=DataBase.unMatchTicket.get(g);if(a==null||b==null){return false}if(d==a.lastPrice){return true}var e=MathUtil.decimal.subtract(d,a.lastPrice);if(e<0){e=MathUtil.decimal.multiply(-1,e)}if(e<b){return false}return true};UnMatchTicketUtil.isValidStake=function(b,c,a){if(CurrencyType.getInstanceOf(c)!=CurrencyType.IR&&CurrencyType.getInstanceOf(c)!=CurrencyType.PR&&CurrencyType.getInstanceOf(c)!=CurrencyType.PKR&&CurrencyType.getInstanceOf(c)!=CurrencyType.PIN){return true}return MathUtil.isInteger(MathUtil.decimal.divide(a,CurrencyType.getInstanceOf(c).stakeMin))};UnMatchTicketUtil.getValidStake=function(c,d,b){var a=CurrencyType.getInstanceOf(d).stakeMin;if(MathUtil.isInteger(MathUtil.decimal.divide(b,a))){return b}else{return MathUtil.decimal.multiply(MathUtil.decimal.add(MathUtil.floorp(MathUtil.decimal.divide(b,a),0),1),a)}}})();