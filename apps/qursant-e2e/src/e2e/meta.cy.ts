describe('Meta SEO', () => {
  const routes = [
    '/',
    '/kursy',
    '/cennik',
    '/rezerwacja',
    '/pytania',
    '/o-nas',
    '/galeria',
    '/kontakt',
  ];

  it('powinny mieć unikalny <title> i meta description', () => {
    const seenTitles = new Set<string>();
    const seenDescs = new Set<string>();

    routes.forEach((path) => {
      cy.visit(path);
      cy.title().then((t) => {
        expect(t, `title for ${path}`).to.be.a('string').and.not.be.empty;
        expect(seenTitles.has(t), `duplicate title: ${t}`).to.be.false;
        seenTitles.add(t);
      });
      cy.get('head meta[name="description"]')
        .invoke('attr', 'content')
        .then((d) => {
          expect(d, `description for ${path}`).to.be.a('string').and.not.be
            .empty;
          expect(seenDescs.has(d as string), `duplicate description: ${d}`).to
            .be.false;
          seenDescs.add(d as string);
        });
    });
  });
});
