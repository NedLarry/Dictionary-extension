const searchQuery = document.querySelector('input');
const searchBtn = document.querySelector('button')
const searchWord = document.querySelector('h4');
const searchMeaning = document.querySelector('#meaning')
const searchExample = document.querySelector('#example')

const wordStore = {}

function wordDefinition () {

    const query = searchQuery.value
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(query))
    .then(response => response.json())
    .then(data => {

        const obj = data[0]
        wordStore.word = obj.word
        wordStore.partOfSpeech = obj.meanings[0].partOfSpeech
        obj.meanings[0].definitions.forEach( def =>{
            wordStore.definition = def.definition
            wordStore.example = def.example
        })

        searchQuery.value = ''        

        searchWord.innerText = wordStore.word
        searchMeaning.innerText = wordStore.definition
        searchExample.innerText = `E.g - ${wordStore.example}`

    })
    .catch(() => {
        searchMeaning.innerText = 'You need internet for this to work'
        searchQuery.value = ''        

    })
}

searchBtn.addEventListener('click', wordDefinition)