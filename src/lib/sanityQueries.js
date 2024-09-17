export const getCorsi = () => {
    return `*[_type=="corso"]{
        _id,titolo,anno,colore,slug
      } `
};

export const getCorsoBySlug = (slug) => {
    return `*[_type == "corso" && slug.current == "${slug}"][0]{
        _id,
        titolo,
        anno,
        colore,
        slug,
        descrizione,
        "gruppi": *[_type == "gruppo" && references(^._id)]{
            _id,
            slug,
            nome
        } | order(nome asc)
    }`
};


export const getGruppi = (slug) => {
    return slug ? `*[_type=="gruppo" && slug.current == "${slug}"]{
        nome, descrizione, 
        "corso":{"titolo":corso->titolo,
        "id":corso->_id,
        "colore":corso->colore,
        "slug":corso->slug,
        "anno":corso->anno},
        "progetti":*[_type=="progetto" && references(^._id)]{
            titolo,
            _id,
            descrizione,
            modulo,
            tipologia,
            immagini,
            video,
            link,
            studenti[]->{
                nome,
                cognome,
            }
        },
        studenti[]->{
            nome,
            cognome,
        },
        "prev": *[_type == "gruppo" && corso->_id == ^.corso->_id && nome < ^.nome] | order(nome desc)[0] {
            nome,
            slug
        },
        "next": *[_type == "gruppo" && corso->_id == ^.corso->_id && nome > ^.nome] | order(nome)[0] {
            nome,
            slug
        }
    } | order(nome asc) `
        : `*[_type=="gruppo"]{
        nome, descrizione, 
        "corso":{"titolo":corso->titolo,
        "id":corso->_id,
        "colore":corso->colore,
        "slug":corso->slug,
        "anno":corso->anno},
        "progetti":*[_type=="progetto" && references(^._id)]{
            titolo,
            _id,
            descrizione,
            modulo,
            tipologia,
            immagini,
            video,
            link,
        }
    }`
};
