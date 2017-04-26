/* 
AppMeasurement for JavaScript version: 1.8.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html

	2015-10-22: Jeroen Hustinx	- Appmeasurement code migration
								- Marketing cloud Visitor API enablement	
	2015-11-12: Jeroen Hustinx	- Addition of the Video Marketing Channels						   
  								- Change to reformatURL function to amend "/?" ending of URL					   
								- Added code date to the code version 				   
	2016-01-20: Jeroen Hustinx	- Changing the setup for warketing cloud ID to a window.mc object with property ID so Tealium can read it
	2016-01-27: Jeroen Hustinx	- added the bin file extension to the linkDownloadFileTypes
	2016-02-19: Jeroen Hustinx	- provided the possibility to set the customer type (eVar36) on the page with window.UPC.vars.customertype
	2016-02-22: Jeroen Hustinx	- setup the code to track the availability of DTM on the page 
	2016-03-07: Jeroen Hustinx	- updated getTimeParting plugin to version 3.3
	2016-03-17: Jeroen Hustinx	- Added kieswijzer to the definitions to set prop23 to Business
	2016-04-14: Jeroen Hustinx	- disabled the DFA request to obtain the Doubleclick cookieID. (disables view through measurement)
	2016-05-02: Jeroen Hustinx	- Updated video trackig to new implementation by Niels Hardeman.
	2016-05-03: Jeroen Hustinx	- Added prefix for the ontdek.ziggo.nl site.
	2016-05-04: Jeroen Hustinx	- Added search engine to the s._extraSearchEngines as a quick fix for an array lengt error that can occur if it's missing
	2016-05-18: Jeroen Hustinx	- Updated to appmeasurement code 1.6
								- Updated the existing modules and added the Activitymap module
								- Added the performanceTiming plugin 
	2016-05-27: Jeroen Hustinx	- Added the s.setProductFilter function to facilitate filter tracking on product pages (HSF)
	2016-09-01:	Jeroen Hustinx	- set value 0 for percentage page viewed to "zero" to facilitate classifications
								- Updated to appmeasurement code 1.6.4
	2016-09-22: Jeroen Hustinx	- changed login tracking to also trigger a login without a previous state
								- added functionality to pick up the customer livecycle if set on the page
	2016-09-29: Jeroen Hustinx	- added interface function for s.getQueryParam as fix for a local implementation error
	2016-10-20: Jeroen hustinx	- included Clicktale asynchronous integration code
								- removed the tracking of eVar23 and eVar24 as requested in DAP-108
	2016-11-02: Jeroen Hustinx	- updated the clicktale code to newest version provided by Clicktale
	2016-12-02: Jeroen Hustinx	- adjusted the code for the VisitorAPI.js
								- slight change to the record funtion to first clear out the events so old events are removed when called
	2016-12-14: Jeroen Hustinx	- added ontdek to the definitions to set Entertainment as prop23 value					
	2016-12-22: Jan Exner		- updated AppMeasurment code to 1.7.0
	2017-02-03: Jeroen Hustinx	- adjusted confition on the tracking of product section lead (eVar47) and product page lead (eVar46)
	2017-02-08: Jeroen Hustinx	- Added the product section lead and product page lead tracking due to flex tool using this file i.s.o s_code.js
	2017-02-17: Jeroen Hustinx	- Changed the Channel Manager plugin to track internal referrers on the first page of a visit
								- updated AppMeasurement code to 1.8
								- added code to pick up eVar151 and eVar152 from the page, if they exist
	2017-02-22: Jeroen Hustinx	- prevented the deletion of pageName, prop23 and prop24 in the s_record function
*/

var s_account = "upcnl";
if(typeof useTestSuite !== 'undefined' && useTestSuite) {
    s_account = "upcsales20test";
} 
var s=s_gi(s_account);

if (typeof(Visitor)=="function") {
    s.visitor = Visitor.getInstance("94B35888557A99487F000101@AdobeOrg");
}

var codeVersion = 'Appm 1.8.0 - SC - 2017-02-22';

var upclocalsearch="zoeken";

var definitions = {
    "Entertainment": ["upclive","welkom","clubziggo","ziggotv","ontdek"],
    "Webmail": ["webmail", "upcmail"],
    "Self Service": ["mijnupc", "cckservices","myupc","mijn-upc"],
    "Sales": ["televisie","internet","bellen","mobiel","alles-in-1","totaalpakketten","pakketten","mobile"],
    "Customer Service": ["klantenservice","verrassing","toestelhulp","verbeterwifi","sorry","samentesten"],
    "About Ziggo": ["over upc", "over-upc","ziggocom"],
    "Search": ["zoeken","zoek"],
    "Info": ["info"],
    "Opzeggen": ["opzeggen"],
    "Terms": ["voorwaarden","disclaimer","privacy"],
    "Sitemap": ["sitemap"],
    "Speedtest": ["speedtest"],
    "Business": ["business","zakelijk","kieswijzer"],
	"Order Process": ["bestellen","orderstatus"],
	"UPC ID": ["login","uitgelogd"],
	"Landing Pages": ["aanbiedingen","ziggohome","wifistraatkast","assets","krachtvaninternet","dekrachtvanziggo"],
	"Community": ["posts","community"],
	"SSO": ["mijn"]	
};
var definitions2 = {
    "Television": ["televisie"],
    "Internet": ["internet"],
    "Telephony": ["bellen"],
    "Bundles": ["totaalpakketten","pakketten","alles-in-1"],
	"Mobile": ["mobiel","mobile"]
};

if (!window.UPC) {
    window.UPC = { vars: {}};
} else if (!window.UPC.vars) {
    window.UPC.vars = {};
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */

s.charSet="UTF-8";
s.currencyCode="EUR"; // This will need to be changed in the s_code and in the Omniture/Adobe back end for single currency tracking. For conversion to the base currency of the report suite this will only be changed at the s_code level.

/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,mobileconfig,bin";
s.linkInternalFilters="javascript:,ziggo.nl,ziggo.com,clubziggo.nl,ziggo.tv,upc.nl,upc.sk,upc.ro,upc.at,upc.hu,upc.cz,upc.ch,upc.ie,upc.pl,upc.de,chello.com,upc.biz,upcmail.net,upclive.com,upcbusiness.nl,"+ document.location.hostname;
s.linkLeaveQueryString=false; // There are two settings (s_code and back end) for this and they do different things
s.linkTrackVars="None";
s.linkTrackEvents="None";


/* Page Name Plugin Config */
s.siteID="";              // leftmost value in pagename
s.defaultPage="homepage"; // filename to add when none exists
s.queryVarsList="toolbar";       // query parameters to keep
s.pathExcludeDelim=";";   // portion of the path to exclude
s.pathConcatDelim="/";   // page name component separator
s.pathExcludeList="";     // elements to exclude from the path

/* channelManager Plugin Config */
/* Differs from PE CMP setup - dash i.s.o. underscore used as delimiter*/
s._extraSearchEngines="360.cn|q|360.cn"; // needed to prevent an issue that can occur with version 3.0 of the plugin
s._channelDomain="";
s._channelParameter="";
s._channelPattern="Doubleclick|DFA:>Display Awareness|daw->Display Prospecting|dpr->Display Retargeting|dre->Display Upsell|dup->Affiliate Display|adi->Paid Search Branded|sbr->Paid Search Non-Branded|snb->Search Retargeting|sre->Social Advertising|soa->Social sharing|sos->Social Care|soc->E-mail advertising|ead->E-mail Owned|eow->TV advertising|tva->TV non-spot|tvn->Radio advertising|raa->Radio non-spot|ran->Outdoor media|ooh->Print media|prn->Direct mail|dmp->Video Awareness|vaw->Video Care|vca->Video Social|vso-";

/* timeParting Plugin Config */
s._tpDST = {
2012:'3/25,10/28',
2013:'3/31,10/27',
2014:'3/30,10/26',
2015:'3/29,10/25',
2016:'3/27,10/30',
2017:'3/26,10/29',
2018:'3/25,10/28',
2019:'3/31,10/27'};

/*  performanceTiming Plugin Config */
s.pte = "event110,event111,event112,event113,event114,event115,event116,event117,event118,event119";
s.ptc = false;


/* Plugin Config */
s.usePlugins=true;

function s_doPlugins(s) {

    var cookie = s.c_r('s_prop75'),
        domainString = 'http://' + document.domain,
        lastPage = (document.referrer.indexOf('?') === -1) ? document.referrer : document.referrer.substr(0,document.referrer.indexOf('?')),
        lastPage = lastPage.substr(domainString.length+1, lastPage.length) + 'homepage',
        cookieDomain = (cookie !== undefined && cookie !== '') ? cookie.substr(0, cookie.indexOf(':')) : "";

    if(lastPage === cookieDomain) {
        s.prop75 = s.c_r('s_prop75');
        if (typeof(s.c_w)==="function") {
            s.c_w('s_prop75','');
        }
    }

    /* Add calls to plugins here */
    s.prop64 = codeVersion;

    /* Plugin Example: trackTNT 1.0	*/
    s.tnt = s.trackTNT();
    if(window.mboxFactoryDefault && typeof mboxFactoryDefault.getPCId === "function"){
        var myPCId = mboxFactoryDefault.getPCId().getId();
        if (typeof myPCId!=="undefined"){
            s.eVar9 = myPCId;
        }
    }

    /* Make sure s.events exists to prevent errors later on in the code when testing on it  */
    s.events=s.events?s.events:"";

    /* Enable Percentage Viewed */
    s.getPPVSetup();

    s.prop25=s.eVar25="Consumer";
    if (s.wd.location.href.lastIndexOf("www.ziggo.nl/zakelijk") !== -1) {s.prop25=s.eVar25="Business";}

    if(s.getVisitStart("s_visitstart")){s.prop9="visit start";}

    /*INSERT PARTNER REWRITE RULES HERE */
    if(!s.pageType && !s.pageName) {
        // fix the URL in case of Webseal implementations
        s._URLforPageName = s.reformatURL("" + s.wd.location);
        s.pageName=s.getPageName(s._URLforPageName);
        s.server=s.wd.location.hostname;
        if (s.wd.location.hostname.lastIndexOf("business.upc")!==-1) {s.pageName="business/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("upcbusiness.nl")!==-1) {s.pageName="business/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("info.upc")!==-1) {s.pageName="info/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("overupc.upc")!==-1) {s.pageName="over upc/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("vragen.upc.nl")!==-1) {s.pageName="klantenservice/rightnow/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("forum.upclive.nl")!==-1) {s.pageName="klantenservice/forum/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("web-edge")!==-1) {s.pageName="webmail/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("upcmail")!==-1) {s.pageName="webmail/"+s.pageName;}
        if (s.wd.location.hostname.lastIndexOf("zoeken.upc.nl")!==-1) {s.pageName="zoeken/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("welkom.ziggo.nl")!==-1) {s.pageName="welkom/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("community.ziggo.nl")!==-1) {s.pageName="community/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("toestelhulp.ziggo.nl")!==-1) {s.pageName="toestelhulp/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("ziggohome.ziggo.nl")!==-1) {s.pageName="ziggohome/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("wifistraatkast.ziggo.nl")!==-1) {s.pageName="wifistraatkast/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("verrassing.ziggo.nl")!==-1) {s.pageName="verrassing/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("verbeterwifi.ziggo.nl")!==-1) {s.pageName="verbeterwifi/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("sorry.ziggo.nl")!==-1) {s.pageName="sorry/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("samentesten.ziggo.nl")!==-1) {s.pageName="samentesten/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("clubziggo.nl")!==-1) {s.pageName="clubziggo/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("ziggo.tv")!==-1) {s.pageName="ziggotv/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("ontdek.ziggo.nl")!==-1) {s.pageName="ontdek/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("ziggo.com")!==-1) {s.pageName="ziggocom/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("krachtvaninternet.ziggo.nl")!==-1) {s.pageName="krachtvaninternet/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("dekrachtvanziggo.nl")!==-1) {s.pageName="dekrachtvanziggo/"+s.pageName;}
		if (s.wd.location.hostname.lastIndexOf("kieswijzer.ziggo.nl")!==-1) {s.pageName="kieswijzer/"+s.pageName;}
		//if (s.wd.location.hostname.lastIndexOf("")!=-1) {s.pageName=""+s.pageName;};
    }

	/* initialize performance timing plugin */
	s.performanceTiming();

    if (!s.prop1) {
        s.prop1 = s.channelExtract("/",1,s.pageName);
    }
    if (!s.prop2) {
        s.prop2 = s.channelExtract("/",2,s.pageName);
    }
    if (!s.prop3) {
        s.prop3 = s.channelExtract("/",3,s.pageName);
    }
    if (!s.prop4) {
        s.prop4 = s.channelExtract("/",4,s.pageName);
    }
    if (!s.hier1) {
        s.hier1 = s.channelExtract("/",10,s.pageName,1);
    }

    if (window.UPC.vars.contentCategory1) {
		s.prop23 = window.UPC.vars.contentCategory1;
	} else if (window.UPC.vars.sProp23) {
		s.prop23 = window.UPC.vars.sProp23;
	} else if (!s.prop23) {
		s.prop23 = matchDefinitions(definitions, s.prop1);
	}
	
	if (window.UPC.vars.contentCategory2) {
		s.prop24 = window.UPC.vars.contentCategory2;
	} else if (window.UPC.vars.sProp24) {
		s.prop24 = window.UPC.vars.sProp24;
	} else if (s.prop23 === "Sales" && !s.prop24) {
		s.prop24 = matchDefinitions(definitions2, s.prop1);
	} else {
	    s.prop24 = s.prop23;
	}
	
    if (!s.channel) {
        if (window.UPC.vars.sChannel) {
            s.channel = window.UPC.vars.sChannel;
        }
        else {
            if (s.prop23 !== s.prop24) {
                if (!s.hier2) {
                    s.hier2 = s.channel = (s.prop23 + "/" + s.prop24);
                }
            }
            else {
                if (!s.hier2) {
                    s.hier2 = s.channel = s.prop23;
                }
            }
        }
    }

    //screenorientation
    if (window.UPC.vars.screenOrientation) {
        s.prop39 = window.UPC.vars.screenOrientation;
    }


    if (window.UPC.vars.eVar45) {
        s.eVar45 = window.UPC.vars.eVar45;
    }

//NL Synovite ID
    if (window.UPC.vars.eVar28) {
        s.eVar28 = window.UPC.vars.eVar28;
    }

//NL cookie law setting
    if (window.UPC.vars.eVar59) {
        s.eVar59 = window.UPC.vars.eVar59;
    }

//NL property for contentType
    if (window.UPC.vars.contentType) {
        s.prop68 = window.UPC.vars.contentType;
    }


// NL Specific campaign tracking.
// CMP setting ????
    s.eVar37="";
	var jh_camp = s.Util.getQueryParam("ecmp");
	if (jh_camp) {
	    s.channelManager('ecmp','','0','','s_cpdirect');
	} else { // if not ecmp present than try CMP
	    s.channelManager('CMP','','0','','s_cpdirect');		
	}
    if(!s.campaign && s._campaignID!=='n/a') {
		s.campaign=s._campaignID;
		s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
        if (s.campaign!==""){
            var ZanoxID=s.Util.getQueryParam('zxuserid');
            if (ZanoxID!==""){
                s.campaign+="|"+ZanoxID;
                // s.eVar37 = s.apl(s.eVar37,'ai-'+ZanoxID,"|");
            }
            // Campaign attributes code
            var jh_querysting = location.search.substring(1);
            var jh_queryPar = s.split(jh_querysting,'&');
            for (var i=0;i<jh_queryPar.length;i++){
                if(jh_queryPar[i].indexOf('ca_')===0){ // if it's a campaign attribute (starts with ca_)
                    var jh_name_val = s.split(jh_queryPar[i].substring(3),"=");
                    if (jh_name_val[1]) { // only set it if there actually is a value provided ...&ca_sz=&... (no value)
                        s.eVar37 = s.apl(s.eVar37,jh_name_val[0] + "-" +jh_name_val[1],"|");
                    }
                }
            }
            if (s.eVar37==="") {
                s.eVar37="no attributes";
            } else {
// NL specific code to set defaults under certain conditions  
                if (s.eVar37.indexOf('sz-')>-1){
                    if (s.eVar37.indexOf('nw-')===-1){ s.eVar37 = s.apl(s.eVar37,"nw-no network","|");}
                    if (s.eVar37.indexOf('st-')===-1){ s.eVar37 = s.apl(s.eVar37,"st-no site","|");}
                }
            }
        }
// eventuele plaats voor sortering van eVar37 waarden
        var jh_CampAttr = s.campaign + "|" + s.eVar37;
        jh_CampAttr=s.getValOnce(jh_CampAttr,'s_campattr',0);
        if (!jh_CampAttr) {
            s.campaign="";
            s.eVar37="";
        }
    }
    if (s._channel === "Other Natural Referrers") {s._channel = "Referrer";}
    if (s._channel === "Typed/Bookmarked") {s._channel = "Direct";}
	if (s._channel === "Paid Search") {
		if (s._campaignID.indexOf("sbr-") > -1) {s._channel = "Paid Search Branded";}
		if (s._campaignID.indexOf("snb-") > -1) {s._channel = "Paid Search Non-Branded";}
	}
	if (s._channel === "Doubleclick") {
		//get subchannel from sitekey parameter
		var jh_DCM_Channel = s.Util.getQueryParam("sitekey");
		// if there is a value and it's longer tha 3 chars in length (to prevent errors)
		if ((jh_DCM_Channel !=="") && (jh_DCM_Channel.length >= 3)) {
			jh_DCM_Channel = "" + jh_DCM_Channel.substring(jh_DCM_Channel.length-3,jh_DCM_Channel.length).toLowerCase()+ "-";
			jh_DCM_Channel = s.getDCMChannel(jh_DCM_Channel);
			if (jh_DCM_Channel !== "") {
				s._channel = jh_DCM_Channel + " (DCM)";
			} else {
				s._channel = "Undefined Value (DCM)"; // Value not expected 
			}
		} else {
			s._channel = "Not provided (DCM)"; // no sitekey in URL or shorter than 3 characters
		}
	}
	if (s._channel === "Unknown Paid Channel") {
		s._jh_channel = s.Util.getQueryParam('echn');
    	if (s._jh_channel) {s._channel = s._jh_channel.toLowerCase();}
	}
// getting the touch points information at purchase time. 
// needs to be done before the channel stacking (otherwise he information would be deleted, 
// crossVisitParticipation will delete the needed cookie - 's_cpm' - at purchase)
    if (s.events.indexOf('purchase') > -1) {
        var jh_tp = 0;
        var jh_c = s.c_r('s_cpm'); // read the cookie
        if (jh_c && jh_c !== '') {
            //If there was a cookie, set arry to the value of the cookie (which is key-value pairs [value,timestamp])
            var arry=s.split(jh_c,'],[');
            //number of channels
            jh_tp = arry.length;
            if (jh_tp > 0) {
                var jh_tp0  = arry[0];
                // a bit of cleanup
                jh_tp0 = s.repl(jh_tp0,'[', '');
                jh_tp0 = s.repl(jh_tp0,']', '');
                jh_tp0 = s.repl(jh_tp0,'\'', '');
                var jh_tp0split = s.split(jh_tp0, ',');
                var jh_timestamp = jh_tp0split[1];
                if (jh_timestamp > 0) {
                    var jh_td = new Date();
                    // set s.prop to the time passed since the first campaign touch point
                    s.prop73 = Math.round((jh_td.getTime() - jh_timestamp) / 3600000);
                    if (s.prop73 === 0) {s.prop73 = "zero";}
                }
            }
        }
        // set prop to the number of touch points
        s.prop74 = jh_tp;
    }

//Channel cross visit participation  

	s.eVar73 = s._channel;
	s.eVar27 = s.crossVisitParticipation(s._channel,"s_cpm","30","8",">","purchase");

//Copy campaign to evar
    if (s.campaign) {s.eVar29="D=v0";}

// Horizon campaign tracking
    if(!s.eVar38){
        s.eVar38=s.Util.getQueryParam('hcmp');
        s.eVar38=s.getValOnce(s.eVar38,'v38',0);
    }

    /* Generic Internal Campaigns */
//if(!s.eVar4)
//	s.eVar4=s.Util.getQueryParam('intcmp');

    /* NL Specific Internal Campaigns */
    if(!s.eVar4) {
        s.eVar4=s.getQueryParamA('intcmp');
	}
	
    /* Site Searched From Page (Search Origination) and percentage viewed of previous page*/
    var getPrev=s.prop37=s.eVar110=s.getPreviousValue(s.pageName,'gpv_pageName'); // This will only work if s.pageName is populated
    if (s.prop37){
        s.prop38=s.getPercentPageViewed();
		if (s.prop38 === "0") {s.prop38="zero";}
    }

    /* Exit Link handling */
    if (s.linkType === "e") {	
        s.prop37=s.getPreviousValue(s.pageName,"gpv_pageName");
        if (s.prop37) {
            s.linkTrackVars='prop37,prop38';
            s.prop38=s.getPercentPageViewed();
			if (s.prop38 === "0") {s.prop38="zero";}
        }
    }
    
    /* Funnel reporting based on product section, needs to be set to have a value in the cookie when s_code.js is used*/
    if ( (s.prop24 !== "Notifications") && (s.prop24 !== "UPC ID") && (s.prop24 !== "Personalized") ){
    	var getprevprop24=s.getPreviousValue(s.prop24,'gpv_prop24');
	}
    /* Funnel reporting based on product section - included here for the flex order tool only */
	if (s.prop24 === "Order Process"){
    	if ((getprevprop24 !== "Order Process") && (getprevprop24 !== "Basket") && (getprevprop24 !== "RFS check") && (getprevprop24 !== "Notifications") && (getprevprop24 !== "UPC ID") && (getprevprop24 !== "Personalized") ) {
        	s.eVar46=getPrev;
        	s.eVar47=getprevprop24;
    	}
	}

    /* Internal Site Search */
    /* Based on the name of the page - choose query param to populate IS (internal search term), set to lowercase, copy to evar, populate origin page, and set deduped event */
	var t_search;
    s.prop5=s.Util.getQueryParam('q1');
    if (s.prop5) {s.prop62='Search result page';}
    s.eVar5=s.prop5=s.prop5.toLowerCase();
    t_search=s.getValOnce(s.eVar5,'ev5',0);
    if(t_search){
        s.events=s.apl(s.events,"event5",",",2);

        /* DAY-1711 */
       if (typeof window.UPC.vars.nrSearchResults !== "undefined") {
		    s.prop12 = window.UPC.vars.nrSearchResults;
            if (window.UPC.vars.nrSearchResults == 0) {
                s.prop6 = s.prop5;
				s.prop12 = "zero";
		    }
        }
    }

    /*  Internal Direct Site Search */
    if (!s.prop5) { // if not q1 set
        s.prop5=s.Util.getQueryParam('q2');
        if (s.prop5) {s.prop62='Direct to destination';}
        s.eVar41=s.prop5=s.prop5.toLowerCase();
        t_search=s.getValOnce(s.eVar41,'ev41',0);
        if(t_search){
            s.events=s.apl(s.events,"event5",",",2);
			s.prop12 = "1";
        }
    }

    /* search origination */
    if (t_search) { s.eVar11=s.prop11=getPrev;}

    /* Product pages */
    var wanttoadd=s.Util.getQueryParam('wanttoadd');
    if (wanttoadd !== ""){
        s.events=s.apl(s.events,'event50',',',2);
        s.eVar66=wanttoadd;
    }

    if (window.UPC.vars.productstring) {
        s.products = window.UPC.vars.productstring;
        s.events=s.apl(s.events,'event8',',',2);
    }

// NL SPECIFIC PRODUCT PAGE VISITED
    if (window.UPC.vars.eVar45) {
        s.eVar45 = window.UPC.vars.eVar45;
        if (s.eVar45 === "Product detail page visited") {
            var t_eVar45=s.getValOnce(s.eVar45,'ev45',0);
            if(t_eVar45){
                s.events=s.apl(s.events,"event8",",",2);
            }
        }
    }
// END NL SPECIFIC PRODUCT PAGE VISITED

    if ((window.UPC.vars.RFSproductstate)&&(window.UPC.vars.RFSproductstate !== 'unknown')) {
        if (window.UPC.vars.RFSproductstate === "n"){
            s.events=s.apl(s.events,'event54',',',2);
        } else {
            s.events=s.apl(s.events,'event53',',',2);
        }
        if (window.UPC.vars.StreetHousenr){
            var getpreviousStreetHousenr=s.getPreviousValue(window.UPC.vars.StreetHousenr, 'gpv_StreetHousenr');
            if (getpreviousStreetHousenr !== window.UPC.vars.StreetHousenr){
                s.eVar33=window.UPC.vars.RFSstatus;
                if (window.UPC.vars.RFSstatus.lastIndexOf("y")!==-1){
                    s.events=s.apl(s.events,'event28',',',2);
                } else {
                    s.events=s.apl(s.events,'event29',',',2);
                }
                s.zip=s.eVar22=window.UPC.vars.zipcode;
            }
        }
    }
    /* END Product pages code  */

    /* Login status tracking */
    if (window.UPC.vars.loginStatus) {
		var getprevstatus;
        switch (window.UPC.vars.loginStatus) {
            case 2:
                s.prop21="Logged Out";
                getprevstatus=s.getPreviousValue(s.prop21,'gpv_prop21');
                if (getprevstatus==="Logged in"){
                    s.eVar21="Logged Out";
                }
                break;
            case 1:
                s.prop21="Logged in";
                getprevstatus=s.getPreviousValue(s.prop21,'gpv_prop21');
                if ((getprevstatus === "Logged Out") || (getprevstatus === "")) {
                    s.eVar21="Logged in";
                    s.events=s.apl(s.events,"event7",",",2);
                }
                break;
            case 3:
                s.prop21="Timeout";
                break;
            default:
                s.prop21="Unknown";
        }
    } else {
        s.prop21="No SSO code on page";
    }


    /* Enhanced download tracking
     See the Playbook and speak with Implementation Consultant regarding various methods of custom scripting for downloads
     */
    if (s.linkType === "d") {
		//Track FileName
		s.url=s.linkURL;
        s.prop7=s.eVar7=s.url.substring(s.url.lastIndexOf("/")+1,s.url.length);
        s.events=s.apl(s.events,"event4",",",2);
        //Track eVar & Event
        s.linkTrackVars="prop7,eVar7,events";
        s.linkTrackEvents="event4";
    }

    /* New/Repeat Status and Pathing Variables */
    s.prop13=s.eVar13=s.getNewRepeat(365); // One Year
    if(s.pageName && s.prop13 === 'New') {s.prop14 = s.pageName;} // This will only work if s.pageName has a value
    if(s.pageName && s.prop13 === 'Repeat') {s.prop15 = s.pageName;} // This will only work if s.pageName has a value

    /* Direct Influence Pages */
    s.eVar3=s.pageName; // This will only work if the s.pageName is populated with string data and the default collection is not being used.

    /* Set Page View Event */
    s.events=s.apl(s.events,'event9',',',2);

    /* Set Time Parting Variables */
	var tpA = s.getTimeParting('n','+1');
	s.eVar16=s.prop16=tpA[1]; 
	s.eVar17=s.prop17=tpA[2]; 
	s.eVar18=s.prop18=tpA[3]; 

// Retrieve light server callContextualized cookie settings
    var cmid=s.Util.getQueryParam('cmid');
    var cmphid=s.Util.getQueryParam('phid');
    if ((cmid !== "" )||(cmphid !== "")){
        s.eVar64=cmid;
        s.eVar65=cmphid;
        s.deleteLightProfiles = "email1";
    }  else {
        s.retrieveLightProfiles = "email1";
    }

    var utm_acid=s.Util.getQueryParam('utm_acid');
    if (utm_acid !== ""){
        s.eVar67=utm_acid;
        s.deleteLightProfiles = "email2";
    } else {
        s.retrieveLightProfiles = "email2";
    }
	
	if ((typeof window.LGI !== "undefined")&&(typeof window.LGI.OIM !== "undefined")&&(typeof window.LGI.OIM.SiteCatalyst !== "undefined")) {
	  if (window.LGI.OIM.SiteCatalyst.eVar8) {s.eVar8 = window.LGI.OIM.SiteCatalyst.eVar8;}
      if (window.LGI.OIM.SiteCatalyst.eVar53) {s.eVar53 = window.LGI.OIM.SiteCatalyst.eVar53;}
      if (window.LGI.OIM.SiteCatalyst.eVar71) {s.eVar71 = window.LGI.OIM.SiteCatalyst.eVar71;}
	}
	if (window.UPC.vars.eVar25) {s.prop25 = s.eVar25 = window.UPC.vars.eVar25;}
	if (window.UPC.vars.customertype) {s.eVar36 = window.UPC.vars.customertype;}		
	if (window.UPC.vars.bannerName) {s.eVar56 = window.UPC.vars.bannerName;}
	if (window.UPC.vars.prop40) {s.prop40 = window.UPC.vars.prop40;}
    if (window.UPC.vars.bundleDescription) {s.prop40 = window.UPC.vars.bundleDescription;}
	if (window.UPC.vars.lifecycle) {s.eVar106 = window.UPC.vars.lifecycle}
	if (window.UPC.vars.eVar151) {s.eVar151 = window.UPC.vars.eVar151;}
	if (window.UPC.vars.eVar152) {s.eVar152 = window.UPC.vars.eVar152;}
	if (typeof(DTM_available) !=="undefined" && DTM_available === "true") {s.prop47 = "true";}
	
	// ToDo trigger R42 s.data is ready
	if (typeof _st !== "undefined") {_st('publishEvent', 'Adobe/loaded', 'Adobe');}
	/* Triggers to other systems that all variables are set for the tracking request */
	if(window.jQuery){
        jQuery(window).triggerHandler("adobeAnalyticsPlugins");
    }
    if(typeof(callbackAdobeAnalyticsPlugins) === "function"){
        callbackAdobeAnalyticsPlugins();
    }
	window.jh_TrackingrequestDone = true;
}
s.doPlugins=s_doPlugins;

/********************************************************************
 *
 * Main Plug-in code (should be in Plug-ins section)
 *
 *******************************************************************/

/* Plugin: channelExtract : 1.0 - returns site section based on delimiter */
s.channelExtract=new Function("d","p","u","pv",""
+"var s=this,v='';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f'"
+")u=s.gtfs().location;u=u+'';li=u.lastIndexOf(d);if(li>0){u=u.substr"
+"ing(0,li);var i,n,a=s.split(u,d),al=a.length;if(al<p){if(pv==1) p=a"
+"l;else return '';}for(i=0;i<p;i++){n=a[i];v=v+n+d;}return v}return "
+"'';");

/* channelManager v3.0 - Tracking External Traffic - 
adjusted for internal referring domains */
s.channelManager=new Function("a","b","c","d","e","f","g",""
+"var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E"
+",F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V;U=s.getQueryParam?1:0;V=s.repl?1"
+":0;h.setTime(h.getTime()+1800000);if(e){i=1;if(s.c_r(e))i=0;if(!s.c"
+"_w(e,1,h))s.c_w(e,1,0);if(!s.c_r(e))i=0;if(f&&s.c_r('s_tbm'+f))i=0;"
+"}j=s.referrer?s.referrer:document.referrer;j=decodeURIComponent(j.t"
+"oLowerCase());if(!j)k=1;else {l=j.indexOf('?')>-1?j.indexOf('?'):j."
+"length;m=j.substring(0,l);n=j.split('/');n=n[2].split('?');o=n[0].t"
+"oLowerCase();p=s.linkInternalFilters.toLowerCase();p=p.split(',');f"
+"or(q=0;q<p.length;q++){r=o.indexOf(p[q])==-1?'':j;if(r)break;}}if(!"
+"r&&!k){t=j;u=v=o;w='Other Natural Referrers';x=s.seList+'>'+s._extr"
+"aSearchEngines;if(d==1){m=V?s.repl(m,'oogle','%'):s.replace(m,'oogl"
+"e','%');m=V?s.repl(m,'ahoo','^'):s.replace(m,'ahoo','^');j=V?s.repl"
+"(j,'as_q','*'):s.replace(j,'as_q','*');}y=x.split('>');for(z=0;z<y."
+"length;z++){A=y[z];A=A.split('|');B=A[0].split(',');for(C=0;C<B.len"
+"gth;C++){D=m.indexOf(B[C]);if(D>-1){if(A[2])E=v=A[2];else E=o;if(d="
+"=1){E=V?s.repl(E,'#',' - '):s.replace(E,'#',' - ');j=V?s.repl(j,'*'"
+",'as_q'):s.replace(j,'*','as_q');E=V?s.repl(E,'^','ahoo'):s.replace"
+"(E,'^','ahoo');E=V?s.repl(E,'%','oogle'):s.replace(E,'%','oogle');}"
+"F=A[1].split(',');for(G=0;G<F.length;G++){if(j.indexOf(F[G]+'=')>-1"
+"||j.indexOf('https://www.google.')==0||j.indexOf('http://r.search.y"
+"ahoo.com')==0)H=1;I=U?s.getQueryParam(F[G],'',j).toLowerCase():s.Ut"
+"il.getQueryParam(F[G],j).toLowerCase();if(H||I)break;}}if(H||I)brea"
+"k;}if(H||I)break;}}if(!r||g!='1'){J=a.split(',');for(var q in J){if"
+"(J.hasOwnProperty(q)){if(U?s.getQueryParam(J[q]):s.Util.getQueryPar"
+"am(J[q])){T=T?T+b+(U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q"
+"])):(U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q]));}}}if(T){v"
+"=T;if(E)w='Paid Search';else w='Unknown Paid Channel';}if(!T&&E&&H)"
+"{v=E;w='Natural Search';}}"
+"if(i&&r){"
+"t=j;u=v=o;w='Internal Referrer';"	
+"}"
+"if(i&&k&&!T)t=u=v=w='Typed/Bookmarked';J="
+"s._channelDomain;if(J&&o&&!r){K=J.split('>');for(L=0;L<K.length;L++"
+"){M=K[L]?K[L].split('|'):'';N=M[1]?M[1].split(','):'';O=N.length;fo"
+"r(P=0;P<O;P++){Q=N[P].toLowerCase();R=('/'+o).indexOf(Q);if(R>-1){w"
+"=M[0];break;}}if(R>-1)break;}}J=s._channelParameter;if(J){K=J.split"
+"('>');for(L=0;L<K.length;L++){M=K[L]?K[L].split('|'):'';N=M[1]?M[1]"
+".split(','):'';O=N.length;for(P=0;P<O;P++){R=U?s.getQueryParam(N[P]"
+"):s.Util.getQueryParam(N[P]);if(R){w=M[0];break;}}if(R)break;}}J=s."
+"_channelPattern;if(J){K=J.split('>');for(L=0;L<K.length;L++){M=K[L]"
+"?K[L].split('|'):'';N=M[1]?M[1].split(','):'';O=N.length;for(P=0;P<"
+"O;P++){Q=N[P].toLowerCase();R=T?T.toLowerCase():'';S=R.indexOf(Q);i"
+"f(S==0){w=M[0];break;}}if(S==0)break;}}S=w?T+u+w+I:'';c=c?c:'c_m';i"
+"f(c!='0')S=s.getValOnce(S,c,0);if(S){s._campaignID=T?T:'n/a';s._ref"
+"errer=t?t:'n/a';s._referringDomain=u?u:'n/a';s._campaign=v?v:'n/a';"
+"s._channel=w?w:'n/a';s._partner=E?E:'n/a';s._keywords=H?I?I:'Keywor"
+"d Unavailable':'n/a';if(f&&w!='Typed/Bookmarked'){h.setTime(h.getTi"
+"me()+f*86400000);s.c_w('s_tbm'+f,1,h);}}else s._campaignID=s._refer"
+"rer=s._referringDomain=s._campaign=s._channel=s._partner=s._keyword"
+"s='';");
/* Top 130 - Grouped */
s.seList="google.,googlesyndication.com,.googleadservices.com|q,as_q|"
+"Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask"
+".co|q,ask|Ask>search.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,"
+"altavista.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>w"
+"ebcrawler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>"
+"blekko.com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>goduckg"
+"o.com|q|GoDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>baid"
+"u.com|word,wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq"
+">myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Nav"
+"er>netscape.com|query,search|Netscape Search>reference.com|q|Refere"
+"nce.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.ti"
+"scali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Y"
+"andex.ru>optimum.net|q|Optimum Search>search.earthlink.net|q|Earthl"
+"ink>search.comcast.net|q|Comcast>libero.it|query|libero.it>excite.c"
+"o|search|Excite>mail.ru|q|Mail.ru>isearch.avg.com|q|AVG>msn.com|q|M"
+"SN>seznam.cz|q|seznam.cz>so.com|q|so.com>ixquick.com|query|ixquick."
+"com>sogou.com|query|sogou.com>360.cn|q|360.cn";

/* Cookie Combining Utility v.5 */
                   
if(!s.__ccucr)
{
    s.c_rr = s.c_r;
    s.__ccucr = true;
    function c_r(k)
    {
        var s = this, d = new Date, v = s.c_rr(k), c = s.c_rspers(), i, m, e;
        if(v) return v; k = s.escape ? s.escape(k) : encodeURIComponent(k);
        i = c.indexOf(' ' + k + '='); c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i);
        e = i < 0 ? i : c.indexOf(';', i); m = m > 0 ? m : e;
        v = i < 0 ? '' : s.unescape ? s.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        return v;
    }
    function c_rspers()
    {
        var s = this, cv = s.c_rr("s_pers"), date = new Date().getTime(), expd = null, cvarr = [], vcv = "";
        if(!cv) return vcv; cvarr = cv.split(";"); for(var i = 0, l = cvarr.length; i < l; i++)    { expd = cvarr[i].match(/\|([0-9]+)$/);
        if(expd && parseInt(expd[1]) >= date) { vcv += cvarr[i] + ";"; } } return vcv;
    }
    s.c_rspers = c_rspers;
    s.c_r = s.cookieRead = c_r;
}
if(!s.__ccucw)
{
    s.c_wr = s.c_w;
    s.__ccucw = true;
    function c_w(k, v, e)
    {
        var s = this, d = new Date, ht = 0, pn = 's_pers', sn = 's_sess', pc = 0, sc = 0, pv, sv, c, i, t, f;
        d.setTime(d.getTime() - 60000); if(s.c_rr(k)) s.c_wr(k, '', d); k = s.escape ? s.escape(k) : encodeURIComponent(k);
        pv = s.c_rspers(); i = pv.indexOf(' ' + k + '='); if(i > -1) { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; }
        sv = s.c_rr(sn); i = sv.indexOf(' ' + k + '='); if(i > -1) { sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
        sc = 1; } d = new Date; if(e) { if(e == 1) e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
        if(e.getTime() > d.getTime()) {  pv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIcomponent(v)) + '|' + e.getTime() + ';';
        pc = 1; } } else { sv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIcomponent(v)) + ';';
        sc = 1; } sv = sv.replace(/%00/g, ''); pv = pv.replace(/%00/g, ''); if(sc) s.c_wr(sn, sv, 0);
        if(pc) { t = pv; while(t && t.indexOf(';') != -1) { var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
        t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht; } d.setTime(ht); s.c_wr(pn, pv, d); }
        return v == s.c_r(s.unescape ? s.unescape(k) : deocdeURIComponent(k));
    }
    s.c_w = s.cookieWrite = c_w;
}

/* Plugin: crossVisitParticipation v1.7 - stacks values from specified variable in cookie and returns value */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/* Plugin: getAndPersistValue 0.3 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);"
+"if(v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/* Plugin: getNewRepeat 1.2 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/* Plugin: getPageName v2.1 - parse URL and return */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");

/* Plugin: getPercentPageViewed v1.2 */
s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"
+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
s.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
+"lc);}");

/* Plugin: getPreviousValue_v1.0 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/* Plugin: getTimeParting 3.3 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,W,U,ds,de,tm,tt,"
+"da=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Sa"
+"turday'],d=new Date(),a=[];z=z?z:0;z=parseFloat(z);if(s._tpDST){var"
+" dso=s._tpDST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d."
+"getFullYear());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d"
+">ds&&d<de){z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime"
+"()+(d.getTimezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getH"
+"ours();M=d.getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U='AM';W='Wee"
+"kday';if(H>=12){U='PM';H=H-12;}if(H==0){H=12;}if(D==6||D==0){W='Wee"
+"kend';}D=da[D];tm=H+':'+M+U;tt=H+':'+((M>30)?'30':'00')+U;a=[tm,tt,"
+"D,W];return a;}");

/* Plugin: getValOnce_v1.1.1 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/* Plugin: getVisitStart v2.0 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/* Plugin: Performance Timing Tracking v0.1 BETA */
s.performanceTiming=new Function("v",""
+"var s=this;if(v)s.ptv=v;if(typeof performance!='undefined'){if(perf"
+"ormance.timing.loadEventEnd==0){s.pi=setInterval(function(){s.perfo"
+"rmanceWrite()},250);}if(!s.ptc||s.linkType=='e'){s.performanceRead("
+");}else{s.rfe();s[s.ptv]='';}}");
s.performanceWrite=new Function("",""
+"var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi)"
+";try{if(s.c_r('s_ptc')==''&&performance.timing.loadEventEnd>0){try{"
+"var pt=performance.timing;var pta='';pta=s.performanceCheck(pt.fetc"
+"hStart,pt.navigationStart);pta+='^^'+s.performanceCheck(pt.domainLo"
+"okupStart,pt.fetchStart);pta+='^^'+s.performanceCheck(pt.domainLook"
+"upEnd,pt.domainLookupStart);pta+='^^'+s.performanceCheck(pt.connect"
+"End,pt.connectStart);pta+='^^'+s.performanceCheck(pt.responseStart,"
+"pt.connectEnd);pta+='^^'+s.performanceCheck(pt.responseEnd,pt.respo"
+"nseStart);pta+='^^'+s.performanceCheck(pt.loadEventStart,pt.domLoad"
+"ing);pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.loadEventStart"
+");pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.navigationStart);"
+"s.c_w('s_ptc',pta);if(sessionStorage&&navigator.cookieEnabled&&s.pt"
+"v!='undefined'){var pe=performance.getEntries();var tempPe='';for(v"
+"ar i=0;i<pe.length;i++){tempPe+='!';tempPe+=pe[i].name.indexOf('?')"
+">-1?pe[i].name.split('?')[0]:pe[i].name;tempPe+='|'+(Math.round(pe["
+"i].startTime)/1000).toFixed(1)+'|'+(Math.round(pe[i].duration)/1000"
+").toFixed(1)+'|'+pe[i].initiatorType;}sessionStorage.setItem('s_pec"
+"',tempPe);}}catch(err){return;}}}catch(err){return;}");
s.performanceCheck=new Function("a","b",""
+"if(a>=0&&b>=0){if((a-b)<60000&&((a-b)>=0)){return((a-b)/1000).toFix"
+"ed(2);}else{return 600;}}");
s.performanceRead=new Function("",""
+"var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi)"
+";var cv=s.c_r('s_ptc');if(s.pte){var ela=s.pte.split(',');}if(cv!='"
+"'){var cva=s.split(cv,'^^');if(cva[1]!=''){for(var x=0;x<(ela.lengt"
+"h-1);x++){s.events=s.apl(s.events,ela[x]+'='+cva[x],',',2);}}s.even"
+"ts=s.apl(s.events,ela[ela.length-1],',',2);}s.linkTrackEvents=s.apl"
+"(s.linkTrackEvents,s.pte,',',2);s.c_w('s_ptc','',0);if(sessionStora"
+"ge&&navigator.cookieEnabled&&s.ptv!='undefined'){s[s.ptv]=sessionSt"
+"orage.getItem('s_pec');sessionStorage.setItem('s_pec','',0);}else{s"
+"[s.ptv]='sessionStorage Unavailable';}s.ptc=true;");
s.rfe=new Function("",""
+"var s=this;var ea=s.split(s.events,',');var pta=s.split(s.pte,',');"
+"try{for(x in pta){var ptr=new RegExp(pta[x]+'[^\,][0-9]*\.[0-9](.*)"
+"');s.events=s.events.match(ptr)[1];s.contextData['events']=s.events"
+";}}catch(e){return;}");

/* Plugin - trackRefresh v1.1 */
s.trackRefresh=new Function("v","c",""
+"var s=this,a,t=new Date,x;t.setTime(t.getTime()+1800000);if(!s.c_r("
+"c)){s.c_w(c,v,t);return v}else{x=unescape(s.c_r(c));if(x==v){x+='~["
+"1]';s.c_w(c,x,0);return x}else{a=s.split(x,'~[');if(a[0]==v){i=pars"
+"eInt(a[1])+1;x=a[0]+'~['+i+']';s.c_w(c,x,0);return x}else{s.c_w(c,v"
+",0);return v}}}");

/* TNT Integration Plugin v2.1AM */
s.trackTNT=new Function("v","p","b",""
+"var s=this,n='s_tnt',q='s_tntref',p=(p)?p:n,v=(v)?v:n,r='',pm=false"
+",b=(b)?b:true;if(s.Util.getQueryParam(q)!=''){s.referrer=s.Util.get"
+"QueryParam(q);}else if(s.c_r(q)!=''){s.referrer=s.c_r(q);document.c"
+"ookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if("
+"(document.cookie.indexOf(q)!=-1&&s.c_r(q)=='')||(location.search.in"
+"dexOf(q+'=')!=-1&&s.Util.getQueryParam(q)=='')){s.referrer='Typed/B"
+"ookmarked';document.cookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:"
+"00:01 GMT;';}if(s.Util.getQueryParam(p)!=''){pm=s.Util.getQueryPara"
+"m(p);}else if(s.c_r(p)){pm=s.c_r(p);document.cookie=p+'=;path=/;exp"
+"ires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if(s.c_r(p)==''&&s.Util."
+"getQueryParam(p)==''){pm='';}if(pm)r+=(pm+',');if(window[v]!=undefi"
+"ned)r+=window[v];if(b)window[v]='';return r;");
/********************************************************************
 * Supporting functions that may be shared between plug-ins
 *******************************************************************/
/* Plugin Utility: apl v1.1 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*  Plugin Utility: join v1.0 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*  Plugin Utility:  p_c */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");
/* Plugin Utility: First Pass only */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");
/* Plugin Utility: Replace v1.0 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*  Plugin Utility:  split v1.5 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/********************************************************************
 * Supporting functions for old H-code plugins
 *******************************************************************/
/* Utility Function: fl */
s.fl=new Function("x","l","return x?(''+x).substring(0,l):x");
/* Utility Function: pt */
s.pt=new Function("x","d","f","a","var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return'';");
s.wd=w=window;
s.rep=s.repl; // changed, used to be s.rep=s_rep (which has additional dependencies)
/* Utility Function: epa */
s.epa=new Function("x","var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape(x)}return y');return tcf(x)}else return unescape(x)}return y");
/* Utility Function: ape */
s.ape=new Function("x","var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x");

/********************************************************************
 *
 * LGI specific functions
 *
 *******************************************************************/
s.getQueryParam = function(p,d,u,h){
  var jh_temp = s.Util.getQueryParam(p,d,u,h);
  return jh_temp;
};


/* matchDefinitions UPC: 1.1 */
function matchDefinitions(definitions,str) {
    var def,re, tmp = null;
    if (typeof(str) === "string") {
        // Parse definitions file
        for (def in definitions) {
            if (definitions.hasOwnProperty(def)) {
                re = new RegExp(definitions[def].join("|") + '/', 'gi');
                if (re && re.test(str)) {
                    return def;
                }
            }
        }
    }
    if ((s.pageName === s.defaultPage) && (s.prop1 === "")){
        return "Homepage";
    }
    return "Undefined";
}

/* Reformat URL: 1.0 */
s.reformatURL = function (x) {
  var ret_val = "";
  var qs_start = x.indexOf('?');
  var qs = qs_start < 0 ? '': x.substring(qs_start + 1); 
  var qs_stripped = x.substring(0, qs ? qs_start: x.length); 
  var hs_start = qs_stripped.indexOf('#');
  var hs = hs_start < 0 ? '': qs_stripped.substring(hs_start + 1); 
  var bare_url = qs_stripped.substring(0, hs ? hs_start: qs_stripped.length); 
  if (bare_url.charAt(bare_url.length-1) === "?") { 
    bare_url = bare_url.substring(0, bare_url.length-1);
  }
  if (bare_url.charAt(bare_url.length-1) === "/") { 
    ret_val = bare_url;
	if (hs) {ret_val += "#" + hs;}
	if (qs) {ret_val += "?" + qs;}
	return ret_val; 
  } else {
    var z = bare_url.indexOf(':'),
	y = bare_url.indexOf('/', z + 4);
	if (y === -1){   
	  ret_val = bare_url + "/";
	  if (hs) {ret_val += "#" + hs;}
	  if (qs) {ret_val += "?" + qs;}
	  return ret_val; 	
	} else {
	  var bare_path=bare_url.substring(y + 1, bare_url.length);
	  var res = bare_path.split("/");
	  if ((bare_path.indexOf(".htm") !== -1) || (res[res.length-1].indexOf(".") !== -1)) {
		return x; 
	  } else {
        ret_val = bare_url + "/";
	    if (hs) {ret_val += "#" + hs;}
	    if (qs) {ret_val += "?" + qs;}
	    return ret_val; 
	  }
	}
    return x;
  }
};

/* getDCMChannel: 1.0 */
s.getDCMChannel = function (subChannelID) {
	var J, K, L, M, N, O, P, Q, R, S, T, w;
	w = "";
	J = s._channelPattern;
    if (J) {
		K = J.split('>');
		for (L = 0; L < K.length; L++) {
			M = K[L]?K[L].split('|'):'';
			N = M[1]?M[1].split(','):'';
			O = N.length;
			for (P = 0; P < O; P++) {
				Q = N[P].toLowerCase();
				T = subChannelID;
				R = T?T.toLowerCase():'';
				S = R.indexOf(Q);
				if (S === 0) {
					w = M[0];
                    break;
				}
			}
			if (S === 0) {
				break;
			}
		}
	}
	return w;
};

/* record: 1.2 */
s.record = function (args) {
	s.events = "";
    if (typeof(args) === "object") {
        for (var attr in args) {
            if (args.hasOwnProperty(attr)) {
                s[attr] = args[attr];
            }
        }
        s.t();
        for (attr in args) {
			if ((attr !== 'prop23') && (attr !== 'prop24') && (attr !== 'pageName')) {
            	if (args.hasOwnProperty(attr) && s.hasOwnProperty(attr)) {
					delete s[attr];
            	}
			}
        }
    }
};

/* getQueryParamA 1.0 Based on getQueryParam 2.3 */
s.getQueryParamA=function(p,d,u){var s=this,v="",i,t,a;d=d?d:"";u=u?u:(s.pageURL?s.pageURL:s.wd.location);
    if(u=="f"){u=s.gtfs().location}while(p){i=p.indexOf(",");i=i<0?p.length:i;
        t=s.p_gpvA(p.substring(0,i),u+"");if(t){t=t.indexOf("#")>-1?t.substring(0,t.indexOf("#")):t
        }if(t){v+=v?d+t:t}a=s.p_gpvA(p.substring(0,i),u+"","#");if(a){v+=v?d+a:a
        }p=p.substring(i==p.length?i:i+1)}return v};s.p_gpvA=function(k,u,a){if(!a){a="?"
}var s=this,v="",i=u.indexOf(a),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,"&","p_gvfA",k)
}return v};s.p_gvfA=function(t,k){if(t){var s=this,i=t.indexOf("="),p=i<0?t:t.substring(0,i),v=i<0?"True":t.substring(i+1);
    if(p.toLowerCase()==k.toLowerCase()){return s.epa(v)}}return""};

/* setProductFilter 1.0 */
s.setProductFilter = function (a,b) {
  var sltv = s.linkTrackVars;		
  var slte = s.linkTrackEvents;		
  s.linkTrackVars="eVar89";		
  s.linkTrackEvents="none";		
  s.eVar89 = a + "|" + b;
  if (b === "on"){		
    s.tl(true,"o","Product filter activated");
  } else {
    s.tl(true,"o","Product filter de-activated");
  }		
  s.linkTrackVars = sltv;		
  s.linkTrackEvents = slte;		 
}

/* brightcove loading functionality */
function bcCatalyst() {
    /* Configure Modules and Plugins */
    var mediaPlayerName="Brightcove Video Cloud Player";
    s.loadModule("Media");
    s.Media.autoTrack=true;
    s.Media.trackWhilePlaying = true;
    s.Media.trackVars = "events,prop61,eVar61,eVar62,eVar63";
    s.Media.trackEvents = "event81,event82,event84,event85,event86,event87,event83";
    s.Media.trackMilestones = "25,50,75";
    s.Media.segmentByMilestones = true;
    s.Media.trackUsingContextData = true;
    s.Media.contextDataMapping = {
        "a.media.name": "eVar61,prop61",
        "a.media.segment": "eVar62",
        "a.contentType": "eVar63",
        "a.media.timePlayed": "event81",
        "a.media.view": "event82",
        "a.media.segmentView": "event84",
        "a.media.complete": "event83",
        "a.media.milestones": {
            25: "event85",
            50: "event86",
            75: "event87"
        }
    };


    /************************ BrightCove PLUGIN *************************/
    /*Custom Code: Brightcove Smart Analytics v2.2 */

    UPC.Components.BrightcoveVideo.SCBrightCoveTemplateReadyHandler = function(evt) {
        jQuery(evt.target).on("play", function(evt){
            onPlay(evt);
        });
        jQuery(evt.target).on("pause", function(evt){
            onStop(evt);
        });
    }

    function onPlay(evt){
        var mediaLength=Math.floor(evt.target.duration);  //Required video duration
        var mediaOffset=Math.floor(evt.target.currentTime); //Required video position
        var video = videojs(evt.target);
        var mediaID=video.mediainfo.id;  //Required video id
        var mediaFriendly=video.mediainfo.name; //Required video title
        var mediaName=mediaID+":"+mediaFriendly; //Required Format video name
        /* Check for start of video */
        if (mediaOffset==0){
            s.Media.open(mediaName,mediaLength,mediaPlayerName);
        }
        s.Media.play(mediaName,mediaOffset);
    }

    function onStop(evt){
        var mediaOffset=Math.floor(evt.target.currentTime);
        var video = videojs(evt.target);
        var mediaID=video.mediainfo.id;  //Required video id
        var mediaFriendly=video.mediainfo.name; //Required video title
        var mediaName=mediaID+":"+mediaFriendly; //Required Format video name
        var mediaLength=Math.floor(evt.target.duration);  //Required video duration

        s.Media.stop(mediaName,mediaOffset);
        if (mediaOffset==mediaLength) {
            s.Media.close(mediaName);
        }
    }

    UPC.Components.BrightcoveVideo.eventReadyHandlers.push(UPC.Components.BrightcoveVideo.SCBrightCoveTemplateReadyHandler);
};

/* WARNING: Changing any of the below variables will cause drastic
 changes to how your visitor data is collected.  Changes should only be
 made when instructed to do so by your account manager.*/
s.visitorNamespace="upc";
s.trackingServer="upc.d2.sc.omtrdc.net";
s.trackingServerSecure="upc.d2.sc.omtrdc.net";

/************************* DFA START *************************/
var dfaConfig = {
    CSID:               '',
    SPOTID:             '4684100',
    tEvar:              'eVar48',
    errorEvar:          'eVar50',
    timeoutEvent:       undefined,
    requestURL:         "http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&var=[VAR]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]",
    maxDelay:           "750",
    visitCookie:        "s_dfa",
    clickThroughParam:  "CMP",
    searchCenterParam:  undefined,
    newRsidsProp:       undefined
};

/* Utility Function: vpr - set the variable vs with value v */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined' && vs){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

s.partnerDFACheck=new Function("cfg",""
+"var s=this,c=cfg.visitCookie,src=cfg.clickThroughParam,scp=cfg.searchCenterParam,p=cfg.newRsidsProp,tv=cfg.tEvar,dl=',',cr,nc,q,g,gs,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Array,aa=new Array,cs=new A"
+"rray;t.setTime(t.getTime()+1800000);cr=s.c_r(c);if(cr){v=0;}ca=s.split(cr,dl);if(s.un)aa=s.split(s.un,dl);else aa=s.split(s.account,dl);for(i=0;i<aa.length;i++){fnd = 0;for(j=0;j<ca.length;j++){if(aa[i] == ca[j]){fnd=1;}}if(!fnd){cs[cn"
+"]=aa[i];cn++;}}if(cs.length){for(k=0;k<cs.length;k++){nc=(nc?nc+dl:'')+cs[k];}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}if(s.wd)q=s.wd.location.search.toLowerCase();else q=s.w.location.search.toLowerCase();q=s.repl(q,'?','&');g=q.indexOf('&'+src.toLow"
+"erCase()+'=');gs=(scp)?q.indexOf('&'+scp.toLowerCase()+'='):-1;if(g>-1){s.vpr(p,cr);v=1;}else if(gs>-1){v=0;s.vpr(tv,'SearchCenter Visitors');}if(!s.c_w(c,cr,t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}r"
+"eturn v>=1;");

s.maxDelay = dfaConfig.maxDelay;
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m) {
	s.cookieConsentGiven = false;
	if (typeof _st !== "undefined" && typeof _st.cookiepermission !== "undefined" && typeof _st.cookiepermission.getCookiePreferences === "function") {	
		var CCvalue = _st.cookiepermission.getCookiePreferences(); 
		if (typeof CCvalue !== undefined && CCvalue !== '' && CCvalue[4] === true) { 
			s.cookieConsentGiven = true;
		}
	}
	if (s.cookieConsentGiven) { //only execute if allowed by the visitor
	    var dfaCheck = s.partnerDFACheck(dfaConfig);
    	if (dfaCheck) {
        	s.Integrate.add("DFA");
       	 	s.Integrate.DFA.tEvar=dfaConfig.tEvar;
       	 	s.Integrate.DFA.errorEvar=dfaConfig.errorEvar;
       	 	s.Integrate.DFA.timeoutEvent=dfaConfig.timeoutEvent;
       	 	s.Integrate.DFA.CSID=dfaConfig.CSID;
       	 	s.Integrate.DFA.SPOTID=dfaConfig.SPOTID;
        	s.Integrate.DFA.get(dfaConfig.requestURL);
        	s.Integrate.DFA.setVars=function(s,p) {
            	if (window[p.VAR]) {
                	if(!p.ec) {
                    	s[p.tEvar]="DFA-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)+"-"+(p.lcs?p.lcs:0)+"-"+(p.lcp?p.lcp:0)+"-"+(p.lastclk?p.lastclk:0)+"-"+(p.lastclktime?p.lastclktime:0);
                	} else if (p.errorEvar) {
                    	s[p.errorEvar] = p.ec;
                	}
            	} else if (p.timeoutEvent) {
                	s.events = ((!s.events || s.events == '') ? '' : (s.events + ',')) + p.timeoutEvent;
            	}
        	};
    	}
	}
};

/************************** DFA END **************************/

/********************** Clicktale START **********************/
function clickTaleGetUID_PID() {
  if (document.cookie.indexOf("WRUID") > -1 && document.cookie.indexOf("WRIgnore=true") == -1) {
    var ca = document.cookie.split(';');
    var PID = 0, UID = 0;
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf("CT_Data") > -1) PID = c.substring(c.indexOf("apv_")).split("_")[1];
      if ( ((document.cookie.match(/WRUID/g) || []).length == 1 && c.indexOf("WRUID") > -1) || (c.indexOf("WRUID") > -1 && (document.cookie.match(/WRUID/g) || []).length > 1 && c.indexOf("WRUID=") == -1) )
        UID = c.split("=")[1];
    }
    return (UID == 0 || PID == 0) ? null : (UID + "." + PID);
  }
  else
    return null;
}
var clickTaleValues = clickTaleGetUID_PID();
if (clickTaleValues != null) {
  s.eVar105 = clickTaleValues;
}
/*********************** Clicktale END ***********************/

/****************************** MODULES *****************************/
/* Module: Integrate 1.8.0 */
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

/* Module: Media 1.8.0 */
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}

/* Module: ActivityMap 1.8.0 */
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.8.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.8.0";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var n=h.AppMeasurement.Ob;n||(n=null);var p=h,l,r;try{for(l=p.parent,r=p.location;l&&l.location&&r&&""+l.location!=""+r&&p.location&&""+l.location!=""+p.location&&l.location.host==r.host;)p=l,l=p.parent}catch(s){}a.P=function(a){try{console.log(a)}catch(b){}};a.La=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.vb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.vb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.K=[];a.ia=function(c,b,d){if(a.Ea)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange",
"visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);
setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ea=1;a[d.m].apply(a,d.a);a.Ea=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.na.join(",")+",");else{d=a.g;if(a.pe||
a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].Mb,f=a[e].Lb));k&&(k=","+k+","+a.G.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",k,m,h,t,l=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+
".":"")+k+","))){h=!1;if(l)for(m=0;m<l.length;m++)k.substring(0,l[m].length)==l[m]&&(h=!0);if(!h&&(""==g&&(g+="&"+c+"."),m=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)m=k.substring(0,h),h=(e?e:"")+m+".",l||(l=[]),l.push(h),g+=a.r(m,b,d,f,h);else if("boolean"==typeof m&&(m=m?"true":"false"),m){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),t=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k=
"v0";break;default:a.La(t)&&("prop"==h?k="c"+t:"eVar"==h?k="v"+t:"list"==h?k="l"+t:"hier"==h&&(k="h"+t,m=m.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(m)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.yb=function(){var c="",b,d,f,e,g,k,m,h,l="",p="",q=e="";if(a.lightProfileID)b=a.O,(l=a.lightTrackVars)&&(l=","+l+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)l=a.linkTrackVars,p=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(l=a[e].Mb,p=a[e].Lb));
l&&(l=","+l+","+a.G.join(",")+",");p&&(p=","+p+",",l&&(l+=",events,"));a.events2&&(q+=(""!=q?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=n;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,
4);k=e.substring(4);!g&&"events"==e&&q&&(g=q,q="");if(g&&(!l||0<=l.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),
g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":q&&(g+=(""!=g?",":"")+q);if(p)for(k=
g.split(","),g="",f=0;f<k.length;f++)m=k[f],h=m.indexOf("="),0<=h&&(m=m.substring(0,h)),h=m.indexOf(":"),0<=h&&(m=m.substring(0,h)),0<=p.indexOf(","+m+",")&&(g+=(g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],l,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],l,e));g="";break;default:a.La(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Rb||"undefined"!=""+a.Hb&&"HTML"!=(""+a.Hb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ha=function(a){var b=h.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.D(c),d,f,e="",
g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ha(c),e)?{id:e.substring(0,100),type:g}:0};a.Pb=function(c){for(var b=a.D(c),d=a.L(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=
a.D(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Gb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,k;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var m=d.onclick?""+d.onclick:"";if(0<=m.indexOf(".tl(")||0<=m.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&
(e=a.Ha(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var l=0,p=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(m=e.toLowerCase(),g=m.indexOf("?"),k=m.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(m=m.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(n=g[k])&&m.substring(m.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&!f&&(m=e.toLowerCase(),a.Ka(m)&&(a.linkInternalFilters||(a.linkInternalFilters=
h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),l=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=0;k<g.length;k++)n=g[k],0<=m.indexOf(n)&&(p=1);p?l&&(f="e"):l||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+
(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.zb=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,k,m,h,e=0;if(g)for(k=0;k<g.length;k++)m=g[k].split("="),f=a.unescape(m[0]).split(","),
m=a.unescape(m[1]),b[m]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.r("c",k)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(m in b)if(!Object.prototype[m])for(h=0;h<f.length;h++)for(e&&(g=b[m].join(","),g==a.account&&(a.e+=("&"!=m.charAt(0)?"&":"")+m,b[m]=[],d=1)),k=0;k<b[m].length;k++)g=b[m][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=m.charAt(0)?"&":"")+m+"&u=0"),b[m].splice(k,
1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(m in b)!Object.prototype[m]&&0<k&&0<b[m].length&&(e+=(e?"&":"")+a.escape(b[m].join(","))+"="+a.escape(m),k--);a.cookieWrite("s_sq",e)}}}return c};a.Ab=function(){if(!a.Kb){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",h="1.2",l=a.cookieWrite("s_cc","true",0)?"Y":"N",n="",q="";if(c.setUTCDate&&(h="1.3",(0).toPrecision&&(h="1.5",c=[],c.forEach))){h="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(h="1.7",
c.reduce&&(h="1.8",h.trim&&(h="1.8.1",Date.parse&&(h="1.8.2",Object.create&&(h="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),n=a.b.Qb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),q=a.b.connectionType}catch(u){}a.resolution=
d;a.colorDepth=f;a.javascriptVersion=h;a.javaEnabled=e;a.cookiesEnabled=l;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=n;a.Kb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.cb=function(){return d.hb};d.ib=function(b){if(d.hb=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.cb,set:d.ib}):d._olc=1}catch(f){d._olc=
1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Cb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};
a.R=function(c,b){var d,f,e,g,k,h;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||(k[h]=a[g][h]);a[g]=k}};a.Ua=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.ub=function(a){var b,d,f,e,g,k=0,h,l="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,
"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?l+=(l?"&":"")+e:n+=(n?"&":"")+e;l&&n?h=l+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+
"?"+h}return a};a.$a=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.I=!1;a.kb=function(){a.I=!0;a.j()};a.ca=!1;a.V=!1;a.gb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.lb=function(c){a.visitorOptedOut=c;a.W=!0;
a.j()};a.Z=!1;a.S=!1;a.Wa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Ya=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Xa=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.Za=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.H=!1;a.xa=function(){a.H=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.I||(a.$a(a.kb)?a.I=!0:a.ea=!0);if(a.ea&&!a.I)return!1;b&&
b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.gb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.lb]),a.visitorOptedOut!=n&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Wa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||
(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ya]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Xa]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.H||(a.Za(a.xa)?a.H=!0:
a.da=!0);a.da&&!a.H&&(c=!1);return c};a.o=n;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.pb=c;f.ob=b;f.mb=d;a.o==n&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.jb(),a.o!=n))for(;0<a.o.length;)c=a.o.shift(),c.ob.apply(c.pb,c.mb)};a.jb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.eb=function(c){var b,d,f=n,e=n;if(!a.isReadyToTrack()){b=[];if(c!=n)for(d in f={},c)f[d]=c[d];e={};a.Ua(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,
a.track,b);return!0}return!1};a.wb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+
"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.eb(c)||(b&&a.R(b),c&&(d={},a.Ua(d,0),a.R(c)),a.Cb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.wb()),a.Gb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=
a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=h.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Va||(a.referrer=p.document.referrer),a.Va=1,a.referrer=a.ub(a.referrer),a.p("_g")),a.zb()&&!a.abort&&(a.Ab(),g+=a.yb(),a.Fb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=
h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.P("DEBUG: Non function type passed to registerPreTrackCallback")};a.bb=function(c){a.wa(a.za,c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.P("DEBUG: Non function type passed to registerPostTrackCallback")};
a.ab=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.P(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=
a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.Fb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,
f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Jb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.bb(d);
a.sb(d);a.ka()};a.Ta=/{(%?)(.*?)(%?)}/;a.Nb=RegExp(a.Ta.source,"g");a.tb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Nb),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Ta),l="";"%"==h[1]&&"timezone_offset"==h[2]?l=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(l=a.xb());d.c=d.c.replace(g,a.escape(l))}}};a.xb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));
return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.tb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);
else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.sb=function(c){a.i||a.Bb();a.i.push(c);a.ma=a.C();a.Ra()};a.Bb=function(){a.i=a.Db();a.i||(a.i=[])};a.Db=function(){var c,b;if(a.ra()){try{(b=h.localStorage.getItem(a.pa()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&
a.offlineFilename&&h.localStorage&&h.JSON||(c=!1);return c};a.Ia=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.F&&a.B.va(),a.q))return;a.Ja=n;if(a.qa)a.ma>a.N&&a.Pa(a.i),a.ua(500);else{var c=a.nb();if(0<c)a.ua(c);else if(c=a.Fa())a.q=1,a.Eb(c),a.Ib(c)}};a.ua=function(c){a.Ja||(c||(c=0),a.Ja=setTimeout(a.ka,c))};a.nb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Oa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.Fa=function(){if(0<a.i.length)return a.i.shift()};a.Eb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.P(b)}};a.fb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var q;try{q=JSON.parse('{"x":"y"}')}catch(u){q=null}q&&"y"==q.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.X=function(a){return h.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Ib=function(c){var b,
d,f;a.fb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Sa&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?
f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=n}));b.Da=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.va=function(){a.ab(c);b.Da();a.rb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ga=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.qb);a.q=0;a.ma>a.N&&a.Pa(a.i);
a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ga())};a.Oa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ma)try{f.removeChild(a.Ma)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ma=a.B}b.F=setTimeout(function(){b.F&&(b.complete?b.va():(a.trackOffline&&
b.abort&&b.abort(),b.Ga()))},5E3);a.qb=c;a.B=h["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.J||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.rb=function(){if(a.ra()&&!(a.Na>a.N))try{h.localStorage.removeItem(a.pa()),a.Na=a.C()}catch(c){}};a.Pa=function(c){if(a.ra()){a.Ra();try{h.localStorage.setItem(a.pa(),h.JSON.stringify(c)),a.N=a.C()}catch(b){}}};a.Ra=function(){if(a.trackOffline){if(!a.offlineLimit||
0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Fa()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.Ka=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Jb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:h.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(l=0;250>=l;l++)76>l&&(a.g.push("prop"+l),a.O.push("prop"+l)),a.g.push("eVar"+l),a.O.push("eVar"+l),6>l&&a.g.push("hier"+l),4>l&&a.g.push("list"+l);l="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.g=a.g.concat(l);a.G=a.G.concat(l);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
"AppMeasurement.offline";a.Oa=0;a.ma=0;a.N=0;a.Na=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;try{if(a.Sa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Sa=!0}}catch(w){}a.ga=function(){a.ha&&(h.clearTimeout(a.ha),a.ha=n);a.l&&a.J&&a.l.dispatchEvent(a.J);a.A&&("function"==typeof a.A?a.A():a.l&&a.l.href&&(a.d.location=
a.l.href));a.l=a.J=a.A=0};a.Qa=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var k=a.M=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Ia();a.track();if(f<a.Ia()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ka(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(n){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.J=b)}}}}}catch(p){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
h.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Qa,30)};a.Qa();a.loadModule("ActivityMap")}
function s_gi(a){var h,n=window.s_c_il,p,l,r=a.split(","),s,q,u=0;if(n)for(p=0;!u&&p<n.length;){h=n[p];if("s_c"==h._c&&(h.account||h.oun))if(h.account&&h.account==a)u=1;else for(l=h.account?h.account:h.oun,l=h.allAccounts?h.allAccounts:l.split(","),s=0;s<r.length;s++)for(q=0;q<l.length;q++)r[s]==l[q]&&(u=1);p++}u||(h=new AppMeasurement);h.setAccount?h.setAccount(a):h.sa&&h.sa(a);return h}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,h=a.s_giq,n,p,l;if(h)for(n=0;n<h.length;n++)p=h[n],l=s_gi(p.oun),l.setAccount(p.un),l.setTagContainer(p.tagContainerName);a.s_giq=0}s_pgicq();


window.setTimeout(function() {
    if(UPC !== undefined && UPC.Components !== undefined && UPC.Components.BrightcoveVideo !== undefined){
        bcCatalyst();
    }
    var s_code=s.t();if(s_code)document.write(s_code);
}, 200);


(function(){
    window.UPC = window.UPC || {};
    window.UPC.vars = window.UPC.vars || {};

    function isPortrait() {
        return window.innerHeight > window.innerWidth;
    }

    function isLandscape() {
        return window.innerHeight < window.innerWidth;
    }

    function isSquare() {
        return window.innerHeight == window.innerWidth;
    }

    if(isPortrait()) {
        window.UPC.vars.screenOrientation = "portrait";
    } else if(isLandscape()) {
        window.UPC.vars.screenOrientation = "landscape";
    } else if(isSquare()) {
        window.UPC.vars.screenOrientation = "square";
    }
})();