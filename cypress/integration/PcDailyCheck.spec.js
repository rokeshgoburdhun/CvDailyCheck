
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

    describe(`Test Case: Book A Test Drive`, function () {     

        it('Navigate to Book a Test Drive', () => {

            cy.visit(datalist.UrlList.bookATestDrive)
            cy.wait(10000)

        })

        // it('Heading Validation', () => {

        //     cy.xpath('//header[contains(@class, "jxXxKL")]//h1')
        //                     .contains("Arrange a test drive")
        //                     .should("be.visible")
                            
        //     cy.xpath('//header[contains(@class, "gBPoAV")]//div[contains(@class,"kksoNx")]')
        //                     .contains(datalist.BookaTestDriveData.HeadingText2)
        //                     .should("be.visible")
        // })  
        
    })
   
})