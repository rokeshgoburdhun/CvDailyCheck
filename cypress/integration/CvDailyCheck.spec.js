
const fixturesData = require('../fixtures/VwCvLive.json')

fixturesData.forEach(datalist => {


    before("Load Home page", () => {
        //cy.viewport(1500, 1500)
        //cy.visit(datalist.UrlList.homePage)
        
    })//Before
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')

        cy.get("body").then($body => {
            if ($body.find('[id="bannerAcceptButton"]').length > 0) {
                cy.get('[id="bannerAcceptButton"]').then($closeBtn => {
                    if ($closeBtn.is(':visible')) {
                        cy.get('[id="bannerAcceptButton"]').should('be.visible').click()
                        cy.wait(3000)
                    }
                });
            }
        })
        cy.get("body").then($body => {
            if ($body.find('[id="psyma_close_button_link"]').length > 0) {
                cy.get('[id="psyma_close_button_link"]').then($closeBtn => {
                    if ($closeBtn.is(':visible')) {
                        cy.get('[id="psyma_close_button_link"]').should('be.visible').click()
                    }
                });
            }
        })
    })

    afterEach(() => {

        Cypress.Cookies.preserveOnce('_uetsid')  
        //Code to Handle the Sesssions in cypress.
        //Keep the Session alive when you jump to another test
        let str = [];
        cy.getCookies().then((cook) => {
            cy.log(cook);
            for (let l = 0; l < cook.length; l++) {
                if (cook.length > 0 && l == 0) {
                    str[l] = cook[l].name;
                    Cypress.Cookies.preserveOnce(str[l]);
                } else if (cook.length > 1 && l > 1) {
                    str[l] = cook[l].name;
                    Cypress.Cookies.preserveOnce(str[l]);
                }
            }
        })
    })

    describe(`Test Case: Download a Brochure Validation`, function () {     

        it('Navigate to Brochure page', () => {

            cy.visit(datalist.UrlList.downloadBrochure)
            cy.wait(10000)
            

        })

        it('Brochure landing page Validation', () => {

            //Verify Title
            cy.get('app-main').shadow().find('.cvbd-header-panel__text').contains("Download information on your ").should('be.visible')
            cy.get('app-main').shadow().find('.cvbd-header-panel__text--strong').contains("new vehicle").should('be.visible')

            //Verify Sub Title
            cy.get('app-main').shadow().find('.cvbd-page-margins').find('h2').contains("Select the models you're interested in").should('be.visible')
        })

        it('Navigate to  Keep in touch Form', () => {

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('p')
                .contains("Click to add model").click()

            cy.get('app-main')
                .shadow()
                .find('.cvbd-selection-grid--item')
                .find('figcaption').contains(datalist.downloadBrochureModel.monday[0].model).click()

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('a')
                .contains("View brochure")
                .click()

        })
        it('Validate Keep in touch Form', () => {

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('h2')
                .contains("Keeping in touch in the future (optional)")
        })

        it('Check if Form Submit Button is Enabled', () => {

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('#salutation_mr')
                .click()
            cy.wait(1000)

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('[data-id="firstname"]')
                .click({ position: 'top' })
                .type("test", { force: true })
            cy.wait(500)

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('[data-id="lastname"]')
                .click({ position: 'top' })
                .type("pleaseIgnore", { force: true })
            cy.wait(500)

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('[data-id="email"]')
                .click({ position: 'top' })
                .type("pleaseIgnore@test.com", { force: true })
            cy.wait(500)

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('[id="customer_business"]')
                .click()

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('[id="communication_email"]')
                .click()

            cy.get('app-main')
                .shadow()
                .find('.cvbd-page-margins')
                .find('data-capture-form')
                .find('.cvbd-vehicle-kmi__button-container')
                .contains("Submit")
                .should('not.be.disabled')
        })
       

        const day = new Date().getDay();
        var modelPerDay = new Array();

        
        switch(day) {
            case 1:
                modelPerDay = datalist.downloadBrochureModel.monday
              break;
            case 2:
                modelPerDay = datalist.downloadBrochureModel.tuesday
              break;
            case 3:
                modelPerDay = datalist.downloadBrochureModel.wednesday
              break;             
            case 4:
                modelPerDay = datalist.downloadBrochureModel.thursday
              break;
            case 5:
                modelPerDay = datalist.downloadBrochureModel.friday
              break;
            default:
                modelPerDay = datalist.downloadBrochureModel.monday
          }


        modelPerDay.forEach(element => {
            it('Reload Brochure page', () => {

                cy.visit(datalist.UrlList.downloadBrochure)
                cy.wait(5000)

            })
            it('Click on Add Model for: ' + element.model, () => {

                cy.get('app-main')
                    .shadow()
                    .find('.cvbd-page-margins')
                    .find('p')
                    .contains("Click to add model").click()

            })

            it('Select Model : ' + element.model, () => {

                cy.wait(6000)
                cy.get('app-main')
                    .shadow()
                    .find('.cvbd-selection-grid--item')
                    .find('figure')
                    .find('figcaption').contains(new RegExp(element.model, "g")).click({force: true})
                    //.find('figcaption').contains(new RegExp("^" + element.model + "$","g")).click({force: true})

            })

            it('Click on View Brochure for : ' + element.model, () => {

                cy.get('app-main')
                    .shadow()
                    .find('.cvbd-page-margins')
                    .find('a')
                    .contains("View brochure")
                    .click()

            })

            it('Skip Form for: ' + element.model, () => {

                cy.get('app-main')
                    .shadow()
                    .find('.cvbd-page-margins')
                    .find('data-capture-form')
                    .find('.cvbd-vehicle-kmi__button-container')
                    .contains("Skip this step")
                    .click()

            })

            it('Download Brochure for : ' + element.model, () => {


                cy.get('app-main')
                    .shadow()
                    .find('.cvbd-page-margins')
                    .find('.cvbd-selection-results__vehicle-container')
                    .contains("View brochure")
                    .click()

                cy.verifyDownload(element.fileName);

            })


        })



        
    })

    describe(`Test Case: Contact Us Kmi Validation`, function () {

        it('Navigate to Contact Us KMI', () => {

            cy.visit(datalist.UrlList.ContactUsKmi)  
            cy.wait(3000)      

        })

        it('Validate Kmi informational text', () => {

            cy.xpath('//div[contains(@class, "gngCve")]//div[contains(@class, "ikKviZ")]').contains(datalist.ContactUsKmiData.InformationalText).should('be.visible')

        })

        it('Type of Enquiry Dropdown Visibility', () => {

            cy.xpath('//div[contains(@class, "gOXhQZ")]//div[contains(@class, "hioXnN ")]//select').should('be.visible');

        })

        it('Gender CheckBox Visibility', () => {       

            cy.xpath('//div[contains(@class, "hhzCOn")]//div[contains(@class, "cEFFhY")]//span[contains(@class, "gwuqyZ")]').contains('Mr').should('be.visible')
            cy.xpath('//div[contains(@class, "hhzCOn")]//div[contains(@class, "heAKsO")]//span[contains(@class, "gwuqyZ")]').contains('Mrs').should('be.visible')
            cy.xpath('//div[contains(@class, "hhzCOn")]//div[contains(@class, "pageI")]//span[contains(@class, "gwuqyZ")]').contains('Miss').should('be.visible')
            cy.xpath('//div[contains(@class, "hhzCOn")]//div[contains(@class, "eOVlpy")]//span[contains(@class, "gwuqyZ")]').contains('Ms').should('be.visible')
        })


        it('Verify Privacy Statement', () => {       

            cy.xpath('//div[contains(@class, "hxyxwY")]//div[contains(@class, "gdSrWx")]').contains(datalist.ContactUsKmiData.PrivacyStatementText1).should('be.visible')
            cy.xpath('//div[contains(@class, "hGMHVF")]//div[contains(@class, "ikKviZ")]').contains(datalist.ContactUsKmiData.PrivacyStatementText2).should('be.visible')
            cy.xpath('//div[contains(@class, "hQaSum")]//a').contains('Privacy Statement here').should('be.visible')
        })

        it('Click Submit button', () => {       

            cy.xpath('//div[contains(@class, "hZpcST")]//h2').click();
        })

        it('Verify Error : TypeOfEnquiryErrorMsg', () => {       
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "ikghia")]//p').contains(datalist.ContactUsKmiData.TypeOfEnquiryErrorMsg).should('be.visible')
        })
        it('Verify Error :FirstNameErrorMsg', () => {       

            cy.xpath('//div[contains(@class, "bHhtWy")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ContactUsKmiData.FirstNameErrorMsg).should('be.visible')
        })
        it('Verify Error : LastNameErrorMsg', () => {       

            cy.xpath('//div[contains(@class, "ghczho")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ContactUsKmiData.LastNameErrorMsg).should('be.visible')

        })
        it('Verify Error: EmailErrorMsg', () => {       

            cy.xpath('//div[contains(@class, "fBHWOl")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ContactUsKmiData.EmailErrorMsg).should('be.visible')

        })
        it('Verify Error: ContactNumberErrorMsg', () => {       

            cy.xpath('//div[contains(@class, "hjwBqB")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ContactUsKmiData.ContactNumberErrorMsg).should('be.visible')

        })
        it('Verify Error: MethodOfContactErrorMsg', () => {       

            cy.xpath('//div[contains(@class, "hokmYr")]//div[contains(@class, "kCxBnY")]').contains(datalist.ContactUsKmiData.MethodOfContactErrorMsg).should('be.visible')

        })
        it('Verify Error: UnableToSubmitErrorMsg', () => {       
            cy.xpath('//div[contains(@class, "hZpcST")]//p').contains(datalist.ContactUsKmiData.UnableToSubmitErrorMsg).should('be.visible')
        })

    })

    describe(`Test Case: Newsletter Kmi Validation`, function () {

        it('Navigate to Newsletter KMI', () => {

            cy.visit(datalist.UrlList.Newsletter)  
            cy.wait(3000)      

        })

        it('Validate Kmi informational text', () => {

            cy.xpath('//div[contains(@class, "gngCve")]//div[contains(@class, "ikKviZ")]').contains(datalist.NewsLetterKmiData.InformationalText).should('be.visible')

        })


        it('Gender CheckBox Visibility', () => {       

            cy.xpath('//div[contains(@class, "gYlspG")]//div[contains(@class, "cEFFhY")]//span[contains(@class, "gwuqyZ")]').contains('Mr').should('be.visible')
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "heAKsO")]//span[contains(@class, "gwuqyZ")]').contains('Mrs').should('be.visible')
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "pageI")]//span[contains(@class, "gwuqyZ")]').contains('Miss').should('be.visible')
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "eOVlpy")]//span[contains(@class, "gwuqyZ")]').contains('Ms').should('be.visible')
        })


        it('Verify Privacy Statement', () => {       

            cy.xpath('//div[contains(@class, "hQaSum")]//div[contains(@class, "ikKviZ")]').contains(datalist.NewsLetterKmiData.PrivacyStatementText1).should('be.visible')
            cy.xpath('//div[contains(@class, "hZpcST")]//div[contains(@class, "ikKviZ")]').contains(datalist.NewsLetterKmiData.PrivacyStatementText2).should('be.visible')
            cy.xpath('//div[contains(@class, "iiDnrA")]//a').contains('Privacy Statement here').should('be.visible')
        })

        it('Click Submit button', () => {       

            cy.xpath('//div[contains(@class, "irRxQh")]//h2').click();
        })

        it('Verify Error Messages for each fields', () => {       

            cy.xpath('//div[contains(@class, "gYlspG")]//div[contains(@class, "kCxBnY")]').contains(datalist.NewsLetterKmiData.GenderErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "bHhtWy")]//div[contains(@class, "kvhekB")]//p').contains(datalist.NewsLetterKmiData.FirstNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "ghczho")]//div[contains(@class, "kvhekB")]//p').contains(datalist.NewsLetterKmiData.LastNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "fBHWOl")]//div[contains(@class, "kvhekB")]//p').contains(datalist.NewsLetterKmiData.EmailErrorMsg).should('be.visible')

            cy.xpath('//div[contains(@class, "hJqiki")]//div[contains(@class, "kCxBnY")]').contains(datalist.NewsLetterKmiData.TypeOfCustomerErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hxyxwY")]//div[contains(@class, "kCxBnY")]').contains(datalist.NewsLetterKmiData.ContactedByEmailErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hGMHVF")]//div[contains(@class, "kCxBnY")]').contains(datalist.NewsLetterKmiData.ContactedByPostErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "irRxQh")]//p').contains(datalist.NewsLetterKmiData.UnableToSubmitErrorMsg).should('be.visible')

        })

    })

    describe(`Test Case: Electric Van Kmi Validation`, function () {

        it('Navigate to Electric Van Kmi', () => {

            cy.visit(datalist.UrlList.ElectricVanKmi)  
            cy.wait(3000)      

        })

        it('Validate Kmi informational text', () => {

            cy.xpath('//div[contains(@class, "gngCve")]//div[contains(@class, "ikKviZ")]').contains(datalist.ElectricVanKmiData.InformationalText).should('be.visible')

        })


        it('Gender CheckBox Visibility', () => {       

            cy.xpath('//div[contains(@class, "gOXhQZ")]//div[contains(@class, "cEFFhY")]//span[contains(@class, "gwuqyZ")]').contains('Mr').should('be.visible')
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "heAKsO")]//span[contains(@class, "gwuqyZ")]').contains('Mrs').should('be.visible')
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "pageI")]//span[contains(@class, "gwuqyZ")]').contains('Miss').should('be.visible')
            cy.xpath('//div[contains(@class, "gdSrWx")]//div[contains(@class, "eOVlpy")]//span[contains(@class, "gwuqyZ")]').contains('Ms').should('be.visible')
        })


        it('Verify Privacy Statement', () => {       

            cy.xpath('//div[contains(@class, "heWczK")]//div[contains(@class, "ikKviZ")]').contains(datalist.NewsLetterKmiData.PrivacyStatementText1).should('be.visible')
            cy.xpath('//div[contains(@class, "hokmYr")]//div[contains(@class, "ikKviZ")]').contains(datalist.NewsLetterKmiData.PrivacyStatementText2).should('be.visible')
            cy.xpath('//div[contains(@class, "hxyxwY")]//a').contains('Privacy Statement here').should('be.visible')
        })

        it('Click Submit button', () => {       

            cy.xpath('//div[contains(@class, "hGMHVF")]//h2').click();
        })

        it('Verify Error Messages for each fields', () => {       

            cy.xpath('//div[contains(@class, "gOXhQZ")]//div[contains(@class, "kCxBnY")]').contains(datalist.ElectricVanKmiData.GenderErrorMsg).should('be.visible')


            cy.xpath('//div[contains(@class, "bHhtWy")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ElectricVanKmiData.FirstNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "ghczho")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ElectricVanKmiData.LastNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "fBHWOl")]//div[contains(@class, "kvhekB")]//p').contains(datalist.ElectricVanKmiData.EmailErrorMsg).should('be.visible')

            cy.xpath('//div[contains(@class, "hhzCOn")]//div[contains(@class, "kCxBnY")]').contains(datalist.ElectricVanKmiData.TypeOfCustomerErrorMsg).should('be.visible')

            cy.xpath('//div[contains(@class, "hJqiki")]//div[contains(@class, "kCxBnY")]').contains(datalist.ElectricVanKmiData.ContactedByEmailErrorMsg).should('be.visible')

            cy.xpath('//div[contains(@class, "hGMHVF")]//p').contains(datalist.ElectricVanKmiData.UnableToSubmitErrorMsg).should('be.visible')

        })

    })

    describe(`Test Case: Fleet Contact Us Kmi Validation`, function () {

        it('Navigate to Fleet Contact Us Kmi Kmi', () => {

            cy.visit(datalist.UrlList.FleetContactUsKmi)  
            cy.wait(3000)      

        })

        it('Validate Kmi informational text', () => {

            cy.xpath('//div[contains(@class, "gngCve")]//div[contains(@class, "ikKviZ")]').contains(datalist.FleetContactUsKmiData.InformationalText).should('be.visible')

        })       


        it('Verify Privacy Statement', () => {       

            cy.xpath('//div[contains(@class, "iiDnrA")]//div[contains(@class, "ikKviZ")]').contains(datalist.FleetContactUsKmiData.PrivacyStatementText1).should('be.visible')
            cy.xpath('//div[contains(@class, "irRxQh")]//div[contains(@class, "ikKviZ")]').contains(datalist.FleetContactUsKmiData.PrivacyStatementText2).should('be.visible')
            cy.xpath('//div[contains(@class, "iBfIoO")]//a').contains('Privacy Statement here').should('be.visible')
        })

        it('Click Submit button', () => {       

            cy.xpath('//div[contains(@class, "iKtSNv")]//h2').click();
            cy.wait(1000)
        })

        it('Verify Error Messages for each fields', () => {       

            cy.xpath('//div[contains(@class, "gOXhQZ")]//div[contains(@class, "ikghia")]//p').contains(datalist.FleetContactUsKmiData.TitleErrorMsg).should('be.visible')


            cy.xpath('//div[contains(@class, "bHhtWy")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.FirstNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "ghczho")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.LastNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "fBHWOl")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.EmailErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hjwBqB")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.JobTitleErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "gEbYXy")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.ContactNumberErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "ldXeio")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.CompanyNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hGwbgL")]//div[contains(@class, "kvhekB")]//p').contains(datalist.FleetContactUsKmiData.CompanyPostCodeErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hJqiki")]//div[contains(@class, "kCxBnY")]').contains(datalist.FleetContactUsKmiData.MethodOfContactErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hZpcST")]//div[contains(@class, "kCxBnY")]').contains(datalist.FleetContactUsKmiData.ContactedByEmailErrorMsg).should('be.visible')

            cy.xpath('//div[contains(@class, "iKtSNv")]//p').contains(datalist.FleetContactUsKmiData.UnableToSubmitErrorMsg).should('be.visible')

        })

    })

    describe(`Test Case: Amarok Kmi Validation`, function () {

        it('Navigate to Amarok  Us Kmi Kmi', () => {

            cy.visit(datalist.UrlList.AmarokKmi)  
            cy.wait(3000)      

        })

        it('Validate Kmi informational text', () => {

            cy.xpath('//div[contains(@class, "gngCve")]//div[contains(@class, "ikKviZ")]').contains(datalist.AmarokKmiData.InformationalText).should('be.visible')

        })       


        it('Verify Privacy Statement', () => {       

            cy.xpath('//div[contains(@class, "hGMHVF")]//div[contains(@class, "ikKviZ")]').contains(datalist.AmarokKmiData.PrivacyStatementText1).should('be.visible')
            cy.xpath('//div[contains(@class, "hQaSum")]//div[contains(@class, "ikKviZ")]').contains(datalist.AmarokKmiData.PrivacyStatementText2).should('be.visible')
            cy.xpath('//div[contains(@class, "hZpcST")]//a').contains('Privacy Statement here').should('be.visible')
        })

        it('Click Submit button', () => {       

            cy.xpath('//div[contains(@class, "iiDnrA")]//h2').click();
            cy.wait(1000)
        })

        it('Verify Error Messages for each fields', () => {       

            cy.xpath('//div[contains(@class, "gYlspG")]//div[contains(@class, "kCxBnY")]').contains(datalist.AmarokKmiData.TitleErrorMsg).should('be.visible')


            cy.xpath('//div[contains(@class, "bHhtWy")]//div[contains(@class, "kvhekB")]//p').contains(datalist.AmarokKmiData.FirstNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "ghczho")]//div[contains(@class, "kvhekB")]//p').contains(datalist.AmarokKmiData.LastNameErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "fBHWOl")]//div[contains(@class, "kvhekB")]//p').contains(datalist.AmarokKmiData.EmailErrorMsg).should('be.visible')
            cy.xpath('//div[contains(@class, "hxyxwY")]//div[contains(@class, "kCxBnY")]').contains(datalist.AmarokKmiData.ContactedByEmailErrorMsg).should('be.visible')

            cy.xpath('//div[contains(@class, "submit-error")]//p').contains(datalist.FleetContactUsKmiData.UnableToSubmitErrorMsg).should('be.visible')

        })

    })
})