
const fixturesData = require('../fixtures/VwPcLive.json')

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
                    }
                });
            }
        })
    })

    afterEach(() => {
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

    // describe(`Test Case: Book A Test Drive`, function () {     

    //     it('Navigate to Book a Test Drive', () => {

    //         cy.visit(datalist.UrlList.bookATestDrive)
    //         cy.wait(10000)

    //     })

    //     it('Heading Validation', () => {

    //         cy.xpath('//h1[contains(@class, "hlxFKY")]')
    //                         .contains(datalist.BookaTestDriveData.HeadingText1)
    //                         .should("be.visible")
                            
    //         cy.xpath('//div[contains(@class, "kksoNx")]')
    //                         .contains(datalist.BookaTestDriveData.HeadingText2)
    //                         .should("be.visible")
    //     })
    //     const day = new Date().getDay();
    //     var modelPerDay = new Array();

        
    //     switch(day) {
    //         case 1:
    //             modelPerDay = datalist.BookaTestDriveData.monday
    //           break;
    //         case 2:
    //             modelPerDay = datalist.BookaTestDriveData.tuesday
    //           break;
    //         case 3:
    //             modelPerDay = datalist.BookaTestDriveData.wednesday
    //           break;             
    //         case 4:
    //             modelPerDay = datalist.BookaTestDriveData.thursday
    //           break;
    //         case 5:
    //             modelPerDay = datalist.BookaTestDriveData.friday
    //           break;
    //         default:
    //             modelPerDay = datalist.BookaTestDriveData.monday
    //       }  

    //       modelPerDay.forEach(element => {
           
    //         it('Select Model: ' + element.model, () => {

    //             cy.xpath('//div[contains(text(),"'+element.model+'")]').click()                 

    //         })

    //         it('Select Retailer : ' + element.retailer, () => {

               
    //             cy.xpath('//button[contains(@class, "ElZGT")]').click()
    //             cy.xpath('//label[contains(@class, "gBwNSA")]//input').type(element.retailer).type('{enter}')

    //         })

    //         it('Skip Date selection ', () => {
    //             cy.xpath('//button[contains(@class, "ElZGT")]').click()
    //             cy.wait(1000)
    //             cy.xpath('//button[contains(@class, "ElZGT")]').click()

    //         })

    //         it('Verify Submit Button', () => {

    //             cy.xpath('//button[contains(@class, "KjTal")]').should('be.visible')

    //         })

    //     })
        
    // })

    describe(`Test Case: Phoenix CMS Login`, function () {     

        it('Navigate to Phoenix CMS', () => {

            cy.visit(datalist.UrlList.phoenixCms)
            cy.wait(5000)
        })

        it('Login to Phoenix CMS', () => {
            cy.get('[id="username"]').type(datalist.phoenixCmsLogin.email)
            cy.get('[id="password"]').type(datalist.phoenixCmsLogin.Password)
            cy.get('[id="login-button"]').click()
            cy.wait(2000)
        
        })
        it('Check Login Sucessfull', () => {
            cy.get('[id="cms-home-link"]').should('be.visible') 
            cy.xpath('//li[contains(text(),"User: rokesh.goburdhun@tribalworldwide.co.uk")]').should('be.visible')     
        })


              
        
    })
    // describe(`Test Case: Jahia CMS Login`, function () {     

    //     it('Navigate to Phoenix CMS', () => {

    //         cy.visit(datalist.UrlList.jahiaCms,{failOnStatusCode:false})
    //         cy.wait(5000)
    //     })

    //     it('Login to Jahia CMS', () => {
    //         cy.get('[name="username"]').type(datalist.jahiaCms.email)
    //         cy.get('[name="password"]').type(datalist.jahiaCms.Password)
    //         cy.xpath('//button[contains(@class, "buttonBlue")]').click({force:true})
    //         cy.wait(10000)
        
    //     })
    //     it('Check Login Sucessfull', () => {
    //         cy.get('[id="userSites_table"]').should('be.visible')  
    //     })


              
        
    // })
})