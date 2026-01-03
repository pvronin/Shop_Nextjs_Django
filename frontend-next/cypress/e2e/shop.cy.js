describe('تست پجینیشن فروشگاه', () => {
  it('باید با کلیک روی شماره صفحات فارسی جابجا شود', () => {
    cy.visit('http://localhost:3000/shop')

    // ۱. اسکرول به پایین چون دکمه‌ها پایین صفحه هستند
    cy.scrollTo('bottom')

    // ۲. کلیک روی عدد ۲ فارسی (چون در کامپوننت toLocaleString زدی)
    cy.contains('۲').click()

    // ۳. چک کردن تغییر URL
    cy.url().should('include', 'page=2')

    // ۴. چک کردن اینکه دکمه صفحه ۲ حالا استایل اکتیو (آبی) دارد
    cy.contains('۲').should('have.class', 'bg-blue-600')
  })
})

it('باید پارامتر سرچ را هنگام جابجایی بین صفحات حفظ کند', () => {
    // ۱. اول سرچ می‌کنیم
    cy.visit('http://localhost:3000/shop?search=phone')

    // ۲. روی صفحه ۲ کلیک می‌کنیم
    cy.scrollTo('bottom')
    cy.contains('۲').click()

    // ۳. چک می‌کنیم که هم search مانده باشد هم page اضافه شده باشد
    cy.url().should('include', 'search=phone')
    cy.url().should('include', 'page=2')
})
