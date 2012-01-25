// global constants
var LABEL_WIDTH = "200";
var TEXTBOX_WIDTH = "400";
// Spreadsheet where all the time booking data is stored
var SPREADSHEET_ID = "0Aulj0IeMHLKXdEFoMVZZdFl1c2g5V0Y3b19qRXhjb3c";
var textOverview = "Student Referral Application";
// Type of DetentionRecord
var DATETEXT = 'Date';
var STAFF_REFERRAL_W_DETENTION = "1";
var STAFF_REFERRAL_NO_DETENTION = "2";
var OFFICE_REFERRAL = "3";
var GOOD_NEWS_REFERRAL = "4";
var SS = SpreadsheetApp.openById('0Aulj0IeMHLKXdE4xbDJ3NU93YWRhNjd6Vnp5TzFuZlE').getSheets()[0];
var CELLS = SS.getRange(1, 1, SS.getLastRow(), 3).getValues();

function doGet(e){
  var app = UiApp.createApplication()
      .setTitle("Student Referral Application")
      .setWidth(850)
      .setHeight(700);
 createForm_(app);
Logger.log(CELLS);
  Logger.log(getDate());
    return app;
}


function createForm_(app){
var _dPanelTop =
      {
    
      "width":"100%",
      "border-radius":"3px",
      "border":"3px solid SlateGray  "
      }

var _cPanelTop =
      {
      "width":"97%" ,
      "padding":"2",
      "border-radius":"3px",
      "border":"2px solid DarkBlue" 
      }
 var _vPanelTop =
      {
      "color": "RoyalBlue",
      "width":"95%" ,
      "padding":"4",
      "border-radius":"4px",
      "border":"2px solid " 
      }
var _dPanelWrap =
      {
      "color": "HoneyDew",
      "width":"100%" ,
      "padding":"4,2,2,4",
      "border-radius":"4px",
      "border":"2px solid"
      }

var _cPanelWrap =
      {
      "color": "DarkBlue",
      "width":"97%" ,
      "padding":"2",
      "border-radius":"3px",
      "border":"2px solid " 
      }

 var _vPanelWrap =
      {
      "color": "Blue",
      "width":"95%" ,
      "padding":"4",
      "border-radius":"3px",
      "border":"2px solid" 
      }

 var _elemHeading = 
     {
       "width":"100"      
     }
     
 var _elemGrid = 
     {
       "width":"97%",
       "padding":"2",
       "border":".5",
       "border-radius":"4px"
     }

 var _elemTextBox = 
     {
       "width":"95%",
       "border-radius":"4px"
      
     }
 var _dPanelSubWrap =
            {
                "Size":"100%,100%",
                "border-radius": "3px",
                "border":"2px solid LightSteelBlue"
            }
                        
var _cPanelSubWrap=
            {
            "Size":"100%,100%",
            "border-radius":"3px",
            "border":"1.5px solid  SlateGrey"
            }
            


var _vPanelSubWrap =
            {   "Size":"100%,100%",
                "border-radius":"3px",
                "border":"2px solid DarkSlateGrey"
             }
            

var _cPanelWrapTitle =
            {
                "border-radius":"3px",
                "border":"1.5px solid SlateGrey"        
            }
    var _settingsLabel =
          {
            "margin-left": "35%",
            "font-size": "1.5em"
          }
    var _settingsGrid =
          {
          "color":"black",
          "padding":"2px",
          "background":"#E0E0E0",
          "border-radius": "5px 5px 5px 5px"
          }                           
        

    //set Generic Navigation wraps
var dPanelNavigation = app.createDecoratorPanel()
        .setId('dPanelNavigation')
    ;
    applyCSS(dPanelNavigation, _dPanelTop);
  var cPanelNavigation = app.createCaptionPanel()
        .setId('cPanelNavigation')
        ;
  applyCSS(cPanelNavigation, _cPanelTop);
var vPanelNavigation = app.createVerticalPanel()
        .setId('vPanelNavigation')
        ;
    applyCSS(vPanelNavigation, _vPanelTop);
// Define NonGeneric Structure Elements for Navigation Section Here

    var dPanelSearch = app.createDecoratorPanel()
            .setId('dPanelSearch')
            ;
  applyCSS(dPanelSearch, _dPanelWrap);

    var cPanelSearch = app.createCaptionPanel('Find Student')
            .setId('cPanelSearch')
        ;
   applyCSS(cPanelSearch, _cPanelWrap);
           
     var dPanelStaffInfo = app.createDecoratorPanel()
          .setId('dPanelStaffInfo')
         ;
   applyCSS(dPanelStaffInfo, _dPanelWrap);
    var cPanelStaffInfo = app.createCaptionPanel('Staff Information')
            .setId('cPanelStaffInfo')
        ;
   applyCSS(cPanelStaffInfo, _cPanelWrap);
    var vPanelStaffWrap = app.createVerticalPanel()
            .setId('vPanelStaffWrap')
        ;
  applyCSS(vPanelStaffWrap, _vPanelWrap);
     var vPanelSearchWrap = app.createVerticalPanel()
               .setId('vPanelSearchWrap')
               
        ;
   applyCSS(vPanelSearchWrap, _vPanelWrap);
// Define NonGeneric Content Elements For Navigation Section

    var cellsStaffData=findStaff();
     var labelStaffName = app.createLabel()
           .setId('labelStaffName')
           .setText(cellsStaffData[0][1]+' '+cellsStaffData[0][0]);
   applyCSS(labelStaffName,_settingsLabel);  
  var labelStaffEmail = app.createLabel()
           .setId('staffEmailLabel')
           .setText(cellsStaffData[0][2]);
   applyCSS(labelStaffEmail,_settingsLabel);  
    var gridStaffInfo=app.createGrid(2,2);
        gridStaffInfo.setWidget(0,0,app.createLabel('Staff Name'))
           .setWidget(0,1,labelStaffName)
           .setWidget(1,0,app.createLabel('Email'))
           .setWidget(1,1,labelStaffEmail)
          ;
 applyCSS(gridStaffInfo, _elemGrid);
    vPanelSearchWrap.add(app.createLabel()
        .setText("Enter Number or Last Name"));
    var searchBox = app.createTextBox()
            .setName('searchBox')
            .setId('searchBox')
            ;
applyCSS(searchBox, _elemTextBox);
	// create a text box for the auto-complete during email lookup in the left
	// grid
	var gridSearch = app.createGrid(2,3)
             .setId('gridSearch');
        gridSearch.setWidget(0, 0, searchBox);


///Handlers for Navigation Panel
  var listHandler = app.createServerKeyHandler('findStuff');
       listHandler.addCallbackElement(gridSearch);
       searchBox.addClickHandler(listHandler)
            .addKeyUpHandler(listHandler);
 /*
 var handlerLocalSearch = app.createClientHandler());
       handlerLocalSearch.forTargets(gridSearch);
       searchBox.addClickHandler(handlerLocalSearch)
            .addKeyUpHandler(handlerLocalSearch);*/
//Attach NonGeneric Content Elements to NonGeneric Navigation Panels
     vPanelSearchWrap.add(gridSearch);
    vPanelStaffWrap.add(gridStaffInfo);


// Attach Non Generic Panels to NonGeneric Panels
    cPanelStaffInfo.add(vPanelStaffWrap);
    dPanelStaffInfo.add(cPanelStaffInfo);
    cPanelSearch.add(vPanelSearchWrap);
    dPanelSearch.add(cPanelSearch);

 // Attach Non Generic Panels to Generic Navigation Panel Structure
     vPanelNavigation.add(dPanelStaffInfo);
    vPanelNavigation.add(dPanelSearch);


// Attach Generic Panel Structure
  cPanelNavigation.add(vPanelNavigation);
  dPanelNavigation.add(cPanelNavigation);


//Define Generic Main wraps
var dPanelMainWrap  = app.createDecoratorPanel()
    .setId('dPanelMainWrap');
     applyCSS(dPanelMainWrap, _dPanelTop);
var cPanelMainWrap  = app.createCaptionPanel('Staff Managed Referral with Detention')
    .setId('cPanelMainWrap');
  applyCSS(cPanelMainWrap, _cPanelTop);
var vPanelMainWrap = app.createVerticalPanel()
    .setId('vPanelMainWrap');
 applyCSS(vPanelMainWrap, _vPanelTop);
/*
 * 
 * Define NonGeneric Structure Elements for Main Section Here
 * 
 */ 
  

	 //Content grid holder for content sections
    var gridContentColumnFormat = app.createGrid(2,2)
    		.setId('gridContentColumnFormat')
    		;
	
    /*
     * Student Panel Structure Start
     */
    var dPanelWrapStudentInfo = app.createDecoratorPanel()
            .setId('dPanelWrapStudentInfo')
            ;
     applyCSS(dPanelWrapStudentInfo, _dPanelSubWrap);
    var cPanelWrapStudentInfo = app.createCaptionPanel('Student Information')
            .setId('cPanelWrapStudentInfo')
           ;
   applyCSS(cPanelWrapStudentInfo, _cPanelSubWrap);
    /*
     * Student Panel Structure End
     *
     * Incident Panel Structure Start
     */
    var dPanelIncidentInformation = app.createDecoratorPanel()
            .setId('dPanelIncidentInformation')
        .setTitle('Incident Information');
   applyCSS(dPanelIncidentInformation, _dPanelSubWrap);
 
    var cPanelIncidentInformation = app.createCaptionPanel('Incident Information')
            .setId('cPanelIncidentInformation');
     applyCSS(cPanelIncidentInformation, _cPanelSubWrap);
    var vPanelContentIncidentRows= app.createVerticalPanel()
			.setId('vPanelContentIncidentRows');
   applyCSS(vPanelContentIncidentRows, _vPanelWrap);
    var cPanelIncidentType= app.createCaptionPanel('Type of Incident')
			.setId('cPanelIncidentType')
			.setTitle('Type of Incident');
     applyCSS(cPanelIncidentType, _cPanelWrapTitle);
    var cPanelIncidentMotive = app.createCaptionPanel('Possible Motive')
		    .setId('cPanelIncidentMotive')
		    .setTitle('Possible Motive');
     applyCSS(cPanelIncidentMotive, _cPanelWrapTitle);
    var cPanelIncidentLocation= app.createCaptionPanel('Incident Location')
			.setId('cPanelIncidentLocation')
			.setTitle('Incident Location');
   applyCSS(cPanelIncidentLocation, _cPanelWrapTitle);
   
    /*
     * Incident Panel Structure End
     *
     * Detention Panel Structure Start
     */
    
    var dPanelWrapDetentionInfo =app.createDecoratorPanel()
			.setId('dPanelWrapDetentionInfo')
			.setTitle( 'Assigned Detention Information')
                       ;
   applyCSS(dPanelWrapDetentionInfo, _dPanelSubWrap);
    var cPanelWrapDetentionInfo =app.createCaptionPanel()
			.setId('cPanelWrapDetentionInfo')
			
			.setTitle( 'Assigned Detention Information') 
                        ;
  applyCSS(cPanelWrapDetentionInfo, _cPanelSubWrap);
    var vPanelWrapDetentionInfo =app.createVerticalPanel()
			.setId('vPanelWrapDetentionInfo')
			;
  applyCSS(vPanelWrapDetentionInfo, _vPanelSubWrap);
    
    var cPanelDetentionDate = app.createCaptionPanel('Detention Date')
       		        .setTitle('Detention Date')
                        .setId('cPanelDetentionDate')
                        ;
    applyCSS(cPanelDetentionDate, _cPanelWrapTitle);
    var cPanelDetentionTime = app.createCaptionPanel('Detention Time')
			.setTitle("Detention Time ")
                        .setId('cPanelDetentionTime')
                        ;
  applyCSS(cPanelDetentionTime, _cPanelWrapTitle);
    var cPanelDetentionType = app.createCaptionPanel('Detention Type')
    		        .setTitle("Detention Type ")
                        .setId('cPanelDetentionType')
                        ;
  applyCSS(cPanelDetentionType, _cPanelWrapTitle);
    /*
     * Detention Panel Structure End
     */
  //  var dPanelSubIncidentInformation= app.createDecoratorPanel()
  //      	.setId('dPanelSubIncidentInformation');
   // var vPanelSubIncidentInformation= app.createVerticalPanel()
     //   	.setId('vPanelSubIncidentInformation');
  //  var cPanelSubIncidentInformation= app.createCaptionPanel()
       // 	.setId('cPanelSubIncidentInformation')
        //	.setTitle('Incident Information');

   
/*
 * 
 * Create Content Element 
 * 
 */
    
    /*
     *Student Elements End
     *
     * Student Elements Start
     */
    
    
    var gridStudentInfo = app.createGrid(2,3)
        .setId('gridStudentInfo')
        .setStyleAttribute( "border-radius", "3px")
         .setStyleAttribute("border","1px solid Blue" ) ;
     var labelStudentId=app.createLabel()
        .setText('Student Number')
        .setId('labelStudentId');

    var labelStudentFirst=app.createLabel()
        .setText('First Name')
        .setId('labelFirstName');

    var labelStudentLast=app.createLabel()
        .setText('Last Name')
        .setId('labelLastName');

    var textStudentId = app.createTextBox()
        .setName('txtStudentId')
        .setId('txtStudentId');
    var textStudentFirst = app.createTextBox()
        .setName('txtFirstName')
        .setId('txtFirstName');
    var textStudentLast = app.createTextBox()
        .setName('txtLastName')
        .setId('txtLastName');


   

    /*
     *Student Elements End
     *
     *Detention Elements Start
     */
    
    var gridDetentionDate = app.createGrid(1,4)
			.setId('gridDetentionDate')
			.setWidth('100%')
			.setCellPadding(2)
			.setBorderWidth(.5);
    var dateBoxDetentionDate1 = app.createDateBox()
    		.setId('dateBoxDetentionDate1');
	var labelDetentionDateInfo2 = app.createLabel()
		    .setId('labelDetentionDateInfo2')
		    .setVisible(false);
	var labelDetentionDateHeading = app.createLabel()
		    .setId('labelDetentionDateHeading')
		    .setText('Date');
	var textBoxNumberDetentions = app.createTextBox()
			.setId('textBoxNumberDetentions')
			.setName('textBoxNumberDetentions')
			.setValue('1');
	var gridDetentionTime = app.createGrid(1,3)
		     .setId('gridDetentionTime')
		     .setBorderWidth(.5)
		     .setWidth("100%");
    var labelDetentionTime = app.createLabel()
	        .setId('labelDetentionTime')
	        .setText('Assign a Detention Time ');
    var labelDetentionTimeInfo2 = app.createLabel()
	        .setId('labelDetentionTimeInfo2')
	        .setVisible(false);
    var gridDetentionType = app.createGrid(1,3)
		    .setId('gridDetentionType')
		    .setBorderWidth(.5)
		    .setWidth("100%");
    var labelDetentionType = app.createLabel()
		    .setId('labelDetentionType')
		    .setText('Assign a Detention Type ');
    var labelDetentionTypeInfo2 = app.createLabel()
		    .setId('labelDetentionTypeInfo2')
		    .setVisible(false);
   var listBoxDetentionTime = app.createListBox()
		    .setId('listBoxDetentionTime')
		    .setName('listBoxDetentionTime')
		    .setTitle('Detention Time');
		listBoxDetentionTime.addItem("")
                  .addItem("After School")
		   .addItem("Lunch Time")
		   .addItem("Period 1-5")
		   .addItem("Period 2-6")
		   .addItem("Period 3-7")
		   .addItem("Period 4-8");
   var listBoxDetentionType = app.createListBox()
		   .setId('listBoxDetentionType')
		   .setName('listBoxDetentionType')
		   .setTitle('Detention Type'); 
		listBoxDetentionType.addItem("After School Detention","After School Det")
		   .addItem("School Day Detention","School Day Det")
		   .addItem("Lunch Type Detention","Lunch Type Det")
		   .addItem("Teacher Monitored Detention","Teacher Monitored Det");

	
     /*
     *Detention Elements End
     *
     *Incident Elements Start
     */
	
	 var gridContentIncidentType = app.createGrid(1,3)
     		.setId('gridContentIncidentType');
	 var gridContentIncidentLocation = app.createGrid(1,3)
	 		.setId('gridContentIncidentLocation');
	 var gridContentIncidentMotive = app.createGrid(1,3)
	        .setId('gridContentIncidentMotive');
	var listBoxIncidentLocation = app.createListBox()
			.setName('listBoxIncidentLocation')
			.setId('listBoxIncidentLocation');
	     listBoxIncidentLocation.addItem("Classroom")
			.addItem("Locker Room")
			.addItem("Hallway")
			.addItem("Athletic-Field")
			.addItem("Auditorium")
			.addItem("Bathroom")
			.addItem("Bus On")
			.addItem("Cafeteria")
			.addItem("Counseling Office")
			.addItem("Gym")
			.addItem("Library")
			.addItem("Office")
			.addItem("Off Campus")
			.addItem("Parking Lot")
			.addItem("Special Event or Fieldtrip")
			.addItem("Stairs")
			.addItem("Sther");
	      
	var listBoxIncidentMotive = app.createListBox()
		    .setName('listBoxIncidentMotive')
		    .setId('listBoxIncidentMotive');
	   listBoxIncidentMotive.addItem("Obtain Peer Attention")
		    .addItem("Avoid Task")
		    .addItem("Avoid Adults")
		    .addItem("Obtain Adult Attention")
		    .addItem("Obtain Item Activities")
		    .addItem("Avoid Peers")
		    .addItem("Unknown")
		    .addItem("Other");
	
	var listBoxIncidentType = app.createListBox()
	       .setName('listBoxIncidentType')
	       .setId('listBoxIncidentType');
		listBoxIncidentType.addItem("Disruptive Conduct")
	       .addItem("Misuse Electronic Devices")
	       .addItem("Tardy")
	       .addItem("Truancy")
	       .addItem("Lying Dishonesty")
	       .addItem("Disrespect")
	       .addItem("Insubordination")
	       .addItem("Language Abusive Profane")
	       .addItem("Refuse Participation")
	       .addItem("Bullying Pestering")
	       .addItem("Cheating Plagiarism")
	       .addItem("Deliberate Misuse Property")
	       .addItem("Inappropriate Dress")
	       .addItem("Obscene Gestures")
	       .addItem("Rough Housing")
	       .addItem("Teacher Contract")
	       .addItem("Willful Disobedience")
	       .addItem("Other");

		
		
/*
 *  
 * *Detention Elements End
 *
 *
*/
    /*
     *
     *add the widgets to the grids 
     *
     */
		 
        /*
	 * Student Info Grid
	 */
        gridStudentInfo.setWidget(0,0,labelStudentId);
        gridStudentInfo.setWidget(0,1,labelStudentFirst);
        gridStudentInfo.setWidget(0,2,labelStudentLast);
        gridStudentInfo.setWidget(1,0,textStudentId);
        gridStudentInfo.setWidget(1,1,textStudentFirst);
        gridStudentInfo.setWidget(1,2,textStudentLast);
        
               /*
		* Detention Time Grid
		*/
	    gridDetentionTime.setWidget(0, 0, labelDetentionTime).setWidth('100%');
	    gridDetentionTime.setWidget(0, 1, listBoxDetentionTime).setWidth('100%');
	    gridDetentionTime.setWidget(0, 2, labelDetentionTimeInfo2).setWidth('100%');
	    
               /*
		* Detention Type Grid
		*/
	    gridDetentionType.setWidget(0, 0, labelDetentionType);
	    gridDetentionType.setWidget(0, 1, listBoxDetentionType);
	    gridDetentionType.setWidget(0, 2, labelDetentionTypeInfo2);
	       /*
		* Detention Type Grid
		*/
            gridDetentionDate.setWidget(0, 0, labelDetentionDateHeading);
	    gridDetentionDate.setWidget(0, 1, dateBoxDetentionDate1);
	    gridDetentionDate.setWidget(0, 2, app.createLabel('Number of Detentions'));
	    gridDetentionDate.setWidget(0, 3, textBoxNumberDetentions);
  
               /*
		* Incident Type Grid
		*/
	    gridContentIncidentType.setWidget(0, 0, app.createLabel().setText('Type'));
	    gridContentIncidentType.setWidget(0, 1, listBoxIncidentType);
	       /*
		* Incident Type Grid
		*/
	    gridContentIncidentLocation.setWidget(0, 0, app.createLabel().setText('Location'));
	    gridContentIncidentLocation.setWidget(0, 1, listBoxIncidentLocation);
	    
	    gridContentIncidentMotive.setWidget(0, 0, app.createLabel().setText('Motive'));
	    gridContentIncidentMotive.setWidget(0, 1, listBoxIncidentMotive);
	    
	   

	    
	    



//create Handlers 


    var detentionDateHandler = app.createServerClickHandler('showDetentionDates')
    		.addCallbackElement(dateBoxDetentionDate1);
    	dateBoxDetentionDate1.addValueChangeHandler(detentionDateHandler);
  
    var handlerIncidentType = app.createServerClickHandler('changeHandlerIncidentType')
    		.addCallbackElement(listBoxIncidentType);
    	listBoxIncidentType.addChangeHandler(handlerIncidentType);
   var handlerIncidentLocation = app.createServerClickHandler('changeHandlerIncidentLocation')
    		.addCallbackElement(listBoxIncidentLocation);
    	listBoxIncidentLocation.addChangeHandler(handlerIncidentLocation);
   var handlerIncidentMotive = app.createServerClickHandler('changeHandlerIncidentMotive')
    		.addCallbackElement(listBoxIncidentMotive);
    	listBoxIncidentMotive.addChangeHandler(handlerIncidentMotive);
  
    var handlerDetentionTime = app.createServerClickHandler('changeHandlerDetentionTime')
    		.addCallbackElement(listBoxDetentionTime);
    	listBoxDetentionTime.addChangeHandler(handlerDetentionTime);

    var handlerDetentionType = app.createServerClickHandler('changeHandlerDetentionType')
    		.addCallbackElement(listBoxDetentionType);
    	listBoxDetentionType.addChangeHandler(handlerDetentionType);



    
  
 


  //end Detention Panel Section

 /*
*
*Incident Panels and Content
*
*/


//cPanelSubIncidentInformation.add( vPanelSubIncidentInformation);
//dPanelSubIncidentInformation.add( cPanelSubIncidentInformation);

      //Attach Content Elements TO NonGeneric Panels
    	cPanelDetentionDate.add(gridDetentionDate);
        cPanelDetentionTime.add(gridDetentionTime);
    	cPanelDetentionType.add(gridDetentionType);

    	vPanelWrapDetentionInfo.add(cPanelDetentionTime);
    	vPanelWrapDetentionInfo.add(cPanelDetentionDate);
    	vPanelWrapDetentionInfo.add(cPanelDetentionType);
    	
    	//cPanelWrapDetentionInfo.add(vPanelWrapDetentionInfo);
    	dPanelWrapDetentionInfo.add(vPanelWrapDetentionInfo);
    	cPanelIncidentType.add(gridContentIncidentType);
        cPanelIncidentLocation.add(gridContentIncidentLocation);
        cPanelIncidentMotive.add(gridContentIncidentMotive);
    	 vPanelContentIncidentRows.add(cPanelIncidentType);
    	 vPanelContentIncidentRows.add(cPanelIncidentLocation);
    	 vPanelContentIncidentRows.add(cPanelIncidentMotive);
    	 
         dPanelIncidentInformation.add(vPanelContentIncidentRows);
    	 //dPanelIncidentInformation.add(cPanelIncidentInformation);
      //vPanelWrapDetentionInfo.add(gridDetentionTime);
    	
    	/*
    	 dPanelIncidentInformation.add(cPanelIncidentInformation);
    	 * 
    	 */ 
   
      	cPanelWrapStudentInfo.add(gridStudentInfo);
        dPanelWrapStudentInfo.add(cPanelWrapStudentInfo);
       
        gridContentColumnFormat.setWidget(0,0,dPanelWrapStudentInfo)
 			.setWidget(1,0,dPanelIncidentInformation)
 			.setWidget(1,1,dPanelWrapDetentionInfo);
      

// Attach NonGeneric Structure Panels to Primary Structure Framework

    vPanelMainWrap.add(gridContentColumnFormat);

// Attach Generic Panel Structure Framework

    cPanelMainWrap.add(vPanelMainWrap);
    dPanelMainWrap.add(cPanelMainWrap);


//Define generic Detail wraps
    var dPanelContentDetail = app.createDecoratorPanel()
        .setId('dPanelContentDetail')
       .setWidth('100%');
    var cPanelContentDetail = app.createCaptionPanel('Detention Preview')
        .setId('cPanelContentDetail')
        .setHeight('100%')
        ;
     var vPanelContentDetail = app.createVerticalPanel()
        .setId('vPanelContentDetail')
        .setHeight('100%')
        .setWidth('450px');
// NonGeneric structure elements for Content Detail Start Here
         
//detentionDetailPreview_(); 
  //add the detail content Grid with labels 
 var flexTableDetentionPreview = app.createFlexTable()
        .setId('flexTableDetentionPreview')
        ;
    var labelStaffIdInfo1 = app.createLabel().setId('labelStaffIdInfo1').setVisible(true).setText(cellsStaffData[0][1]+' '+cellsStaffData[0][0]);;
    var labelStudentIdInfo1 = app.createLabel().setId('labelStudentIdInfo1').setVisible(true);
    var labelFirstNameInfo1 = app.createLabel().setId('labelFirstNameInfo1').setVisible(true);
    var labelLastNameInfo1 = app.createLabel().setId('labelLastNameInfo1').setVisible(true);
    var labelIncidentDateInfo1 = app.createLabel().setId('labelIncidentDateInfo1').setVisible(true);
    var labelIncidentTimeInfo1 = app.createLabel().setId('labelIncidentTimeInfo1').setVisible(true);
    var labelIncidentLocationInfo1 = app.createLabel().setId('labelIncidentLocationInfo1').setVisible(true);
    var labelIncidentTypeInfo1 = app.createLabel().setId('labelIncidentTypeInfo1').setVisible(true);
    var labelIncidentMotiveInfo1 = app.createLabel().setId('labelIncidentMotiveInfo1').setVisible(true);
    var labelIncidentDescriptionInfo1 = app.createLabel().setId('labelIncidentDescriptionInfo1').setVisible(true);
    //var labelCkOtherInterventionsInfo1 = app.createLabel().setId('labelCkOtherInterventionsInfo1').setVisible(false);
    var labelDetentionDateInfo1 = app.createLabel().setId('labelDetentionDateInfo1').setVisible(true);
    var labelDetentionDayInfo1 = app.createLabel().setId('labelDetentionDayInfo1').setVisible(true);
    var labelDetentionTimeInfo1 = app.createLabel().setId('labelDetentionTimeInfo1').setVisible(true);
    var labelDetentionTypeInfo1 = app.createLabel().setId('labelDetentionTypeInfo1').setVisible(true);
    var labelAmountDetentionsInfo1 = app.createLabel().setId('labelAmountDetentionsInfo1').setVisible(true);
                            flexTableDetentionPreview.setWidget(0,0,app.createLabel('Staff Information '));
                            flexTableDetentionPreview .setWidget(1, 1, labelStaffName);
                            flexTableDetentionPreview .setWidget(1, 2, labelStaffEmail);
                            flexTableDetentionPreview.setWidget(1, 3, app.createLabel('Submission Date'));
                             flexTableDetentionPreview.setWidget(1, 4, app.createLabel(getDate()));
                             flexTableDetentionPreview.setWidget(2, 0, app.createLabel('Student Information '));
                             flexTableDetentionPreview.setWidget(2, 1, app.createLabel('ID '));
                             flexTableDetentionPreview.setWidget(3, 1, labelStudentIdInfo1 );
                             flexTableDetentionPreview.setWidget(2, 2, app.createLabel('First Name '));
                             flexTableDetentionPreview.setWidget(2, 3, app.createLabel('Last Name '));
                             flexTableDetentionPreview.setWidget(3, 2, labelFirstNameInfo1);
                             flexTableDetentionPreview.setWidget(3, 3, labelLastNameInfo1);
                             flexTableDetentionPreview.setWidget(4, 0, app.createLabel('Incident Information'));
                             flexTableDetentionPreview.setWidget(4, 1,  app.createLabel('Date'));
                             flexTableDetentionPreview.setWidget(4, 2, app.createLabel('Incident Type'));
                             flexTableDetentionPreview.setWidget(4, 3, app.createLabel('Location'));
                             flexTableDetentionPreview.setWidget(4, 4, app.createLabel('Motive'));
                             flexTableDetentionPreview.setWidget(5, 1, labelIncidentDateInfo1);
                             flexTableDetentionPreview.setWidget(5, 2, labelIncidentTypeInfo1);
                             flexTableDetentionPreview.setWidget(5, 3, labelIncidentLocationInfo1 );
                             flexTableDetentionPreview.setWidget(5, 4, labelIncidentMotiveInfo1);
                             flexTableDetentionPreview.setWidget(6,0, app.createLabel('Incident Description'));
                             flexTableDetentionPreview.setWidget(6,1, labelIncidentDescriptionInfo1);
                             flexTableDetentionPreview.setWidget(7, 0, app.createLabel('Detention Information'));
                             flexTableDetentionPreview.setWidget(7, 1,  app.createLabel('Date'));
                             flexTableDetentionPreview.setWidget(7, 2, app.createLabel('Time'));
                             flexTableDetentionPreview.setWidget(7, 3, app.createLabel('Type'));
                             flexTableDetentionPreview.setWidget(7, 4, app.createLabel('Day of Detention'));
                             flexTableDetentionPreview.setWidget(8, 1, labelDetentionDateInfo1);
                             flexTableDetentionPreview.setWidget(8, 2, labelDetentionTimeInfo1);
                             flexTableDetentionPreview.setWidget(8, 3, labelDetentionTypeInfo1);
                             flexTableDetentionPreview.setWidget(8, 4, labelDetentionDayInfo1);
   vPanelContentDetail.add(flexTableDetentionPreview);
//Apply Panel Structure Framework

    cPanelContentDetail.add(vPanelContentDetail);
    dPanelContentDetail.add(cPanelContentDetail);


var splitLayoutPanel = app.createSplitLayoutPanel()
             .setId('splitLayoutPanel');

            //Add west component
            splitLayoutPanel.addWest(dPanelNavigation, 200);
            //add north component
            splitLayoutPanel.addNorth(dPanelMainWrap, 300);
            //add content for detail component
            splitLayoutPanel.add( dPanelContentDetail);

            //define width & height of the split layout panel
            splitLayoutPanel.setSize('100%', '100%')
                 .setStyleAttribute("background", "WhiteSmoke");

//Add the splitLayoutPanel to the application
app.add(splitLayoutPanel);
//uncomment the following lines if you are using in a function
  
  return app;
}


function findStaff(){
    var app = UiApp.getActiveApplication();
    var userStaff = Session.getActiveUser().getUserLoginId();
    var staffSS = SpreadsheetApp.openById('0Aulj0IeMHLKXdFVGQ09vS3lTWWpkeHZUUDZVVEt0SkE').getSheets()[0];
    var cellsStaff = staffSS.getRange(1,1,staffSS.getLastRow(),4).getValues().findCellsStaff(userStaff);
    return cellsStaff;
}
function findStuff(e) {
  if(e.parameter.searchBox.length>2){
  var cells=CELLS.findCells(e.parameter.searchBox);
        //var ss = SS;
	var ss = SpreadsheetApp.openById('0Aulj0IeMHLKXdE4xbDJ3NU93YWRhNjd6Vnp5TzFuZlE').getSheets()[0];
	//var cells = ss.getRange(1, 1, ss.getLastRow(), 3).getValues().findCells(e.parameter.searchBox);

        var app = UiApp.getActiveApplication();
	var table = app.createFlexTable();
	app.getElementById('gridSearch').setWidget(1, 0, table);
        var i = "";
	for (i = 0; i < cells.length; i++) {
		var label = app.createLabel(
				cells[i][0] + ' ' + cells[i][1] + ' ' + cells[i][2]).setId(cells[i][0] + ' ' + cells[i][1] + ' ' + cells[i][2]).addClickHandler(app.createServerClickHandler('showSelect'));
                table.setWidget(i,0, label);
		//Logger.log("lastRow:" + label);
	}
	return app;
    }
}

function showSelect(e) {
	var app = UiApp.getActiveApplication();
	//var value = e.parameter.source;
	var result = app.createLabel(e.parameter.searchBox);
  //Logger.log("result: " + result+ " value:" + value);
	app.getElementById('gridSearch').setWidget(1, 0, result);
        var studentInfo = e.parameter.source.split(" ");
	app.getElementById('txtStudentId').setText(studentInfo[0]);
        app.getElementById('txtFirstName').setText(studentInfo[1]);
        app.getElementById('txtLastName').setText(studentInfo[2]);
        app.getElementById('labelStudentIdInfo1').setText(studentInfo[0]).setVisible(true);
        app.getElementById('labelFirstNameInfo1').setText(studentInfo[1]).setVisible(true);
        app.getElementById('labelLastNameInfo1').setText(studentInfo[2]).setVisible(true);
        app.getElementById('searchBox').setText("");
        //app.getElementById('grid').setWidget(1, 0, "");
  //app.getElementById('tbFirstName').setWidget(0, 0, value);
	return app;
}


function changeHandlerDetentionTime(e){
    var app = UiApp.getActiveApplication();
    var detTime = e.parameter.listBoxDetentionTime;
    app.getElementById('labelDetentionTimeInfo1')
        .setVisible(true)
        .setText(detTime);

    //you can get the ID of the list box with: e.parameter.source
    return app;
}
function changeHandlerIncidentType(e){
    var app = UiApp.getActiveApplication();
    var incidentType = e.parameter.listBoxIncidentType;
    app.getElementById('labelIncidentTypeInfo1')
        .setVisible(true)
        .setText(incidentType);

    //you can get the ID of the list box with: e.parameter.source
    return app;
}
function changeHandlerIncidentLocation(e){
    var app = UiApp.getActiveApplication();
    var incidentLocation = e.parameter.listBoxIncidentLocation;
    app.getElementById('labelIncidentLocationInfo1')
        .setVisible(true)
        .setText(incidentLocation);

    //you can get the ID of the list box with: e.parameter.source
    return app;
}function changeHandlerIncidentMotive(e){
    var app = UiApp.getActiveApplication();
    var incidentMotive = e.parameter.listBoxIncidentMotive;
    app.getElementById('labelIncidentMotiveInfo1')
        .setVisible(true)
        .setText(incidentMotive);

    //you can get the ID of the list box with: e.parameter.source
    return app;
}


function changeHandlerDetentionType(e){
    var app = UiApp.getActiveApplication();
    var detType = e.parameter.listBoxDetentionType;
    app.getElementById('labelDetentionTypeInfo1')
        .setVisible(true)
        .setText(detType);

    return app;
}

function showDetentionDates(e){

    //get the active aplication
    var app = UiApp.getActiveApplication();
    var dateUnformat = e.parameter.dateBoxDetentionDate1;
    var Date1 = new Date(dateUnformat);
    var dateFormat = Utilities.formatDate(Date1,"GMT -8","MM/dd/yyyy");

    //set the dateInfo labels visible, also make the text as selected dates
    app.getElementById('labelDetentionDateInfo1')
        .setVisible(true)
        .setText(dateFormat);
    //app.getElementById('referralDateInfo1').setVisible(true).setText(e.parameter.referralDate1.toString());

    return app;
}


function getDate(){
var d = new Date();
  //var dateofDay = new Date(d.getTime());
  return Utilities.formatDate(d, "GMT -8", "MM-dd-yyyy");
}
Object.prototype.findCells = function(key) {

  var j = "";
	var searchMatch = [];
	for (j = 0; j < this.length; j++) {
		if (this[j][0].toString().toLowerCase().search(key.toString().toLowerCase()) != -1) {
			//searchMatch.push([this[j][0],this[j][1]]);
			searchMatch.push([ this[j][0], this[j][1], this[j][2] ]);
		}
	}
	return searchMatch;
}
Object.prototype.findCellsStaff = function(userKey) {
  var j = "";
	var searchStaffMatch = [];
	for (j = 0; j < this.length; j++) {
		if (this[j][3].toString().toLowerCase().search(userKey.toString().toLowerCase()) != -1) {
			//searchMatch.push([this[j][0],this[j][1]]);
			searchStaffMatch.push([this[j][1],this[j][2],this[j][3],this[j][0]]);
		}
	}
	return searchStaffMatch;
}
function applyCSS(element, style){
  for (var keys2 in style){
    if ((keys2 != 'findCells')&&(keys2 != 'findCellsStaff')){
    element.setStyleAttribute(keys2, style[keys2]); 
    }  
  }
}
