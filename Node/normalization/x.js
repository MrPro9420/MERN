
// Using reference (Normalization)
let author = {
    name: "Mosh"
}

let course = {
    author: 'id',

}

// Using Embedded Documents (Denormalization) 

let course = {
    author: {
        name: 'Mosh'
    }
}

// Hybride 

let author = {
    name: "Mosh"
}

let course = {
    author: {
        id: 'ref',
        name: 'Mosh'
    },

}
