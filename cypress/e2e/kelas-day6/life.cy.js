let optionArray = [];

describe('kelas-day 6', async () => {
  it.skip('static dropdown', async () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false; //Mengabaikan error khusus untuk tes ini
    });
    // await cy.visit('https://demo.automationtesting.in/Register.html');
    await cy.visit('https://demoqa.com/select-menu');
    // await cy.xpath("//select[@id='Skills']").select('HTML');
    // await cy.xpath("//select[@id='oldSelectMenu']").select('3');
    await cy.get('#oldSelectMenu').select('3');
    await cy.get('#oldSelectMenu').select('0');

  });

  it.skip('dropdown looping', async function () {
    cy.on('uncaught:exception', (err, runnable) => {
      return false; //Mengabaikan error khusus untuk tes ini
    });

    let expectedSkills = [
      'APIs', 'C', 'C++', 'hbd'
    ]
    await cy.visit('https://demo.automationtesting.in/Register.html');
    await cy.get('#Skills').find('option').each(function (optionItem) {
      // cy.log(optionItem);
      const optionValue = optionItem.val();
      optionArray.push(optionValue);
    });
    cy.wrap(optionArray).should('include.members', expectedSkills);
    // await expect(optionArray).to.include(expectedSkills)
    // let options = cy.wrap(optionArray);
  });

  it.skip('dynamic looping', async function () {
    cy.on('uncaught:exception', (err, runnable) => {
      return false; //Mengabaikan error khusus untuk tes ini
    });

    await cy.visit('https://demo.automationtesting.in/Register.html');
    await cy.wait(3000);
    await cy.get('#Skills').select('C');
  });

  it('autosuggestive dropdown', async function () {
    cy.on('uncaught:exception', (err, runnable) => {
      return false; //Mengabaikan error khusus untuk tes ini
    });
    let fieldSuggestive = '//span[@class="select2-selection select2-selection--single"]'
    let fieldSearch = '//input[@class="select2-search__field"]'
    let fieldSearchItem = '//ul[@class="select2-results__options"]/li'

    await cy.visit('https://demo.automationtesting.in/Register.html');
    await cy.xpath(fieldSuggestive).click();
    await cy.xpath(fieldSearch).type('de');
    await cy.xpath(fieldSearchItem).contains('Denmark').click();
  });
  
})