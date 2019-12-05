import React from 'react';

export const GetPromptsForTopic = (topic) => {
    switch (topic) {
        case 'family':
            return [
                {
                    action: 'In French, talk about',
                    title: 'How many siblings do you have?',
                    hints: ['"Frère" means "Brother"', '"Soeur" means "Sister"', '"Enfant unique" means "Unique child"']
                },
                {
                    action: 'In French, talk about',
                    title: 'Which family member you like most',
                    hints: ['"J\'aime beaucoup..."', 'j\'adore', 'Comparisons: "Plus grand que..."']
                },
                {
                    action: 'Say in French',
                    title: 'What you like the most about your family',
                    hints: ['Think about time spent together: cinéma, nöel, les cadeaux, etc.']
                },
                {
                    action: 'Describe in French',
                    title: 'What your parents like',
                    hints: ['"Gentil(le)" means "kind"', 'Useful adjectives: Joyeux, honnête, éducateur']
                },
                {
                    action: 'In French, talk about',
                    title: 'Where you think is the best place to raise a family?',
                    hints: ['Useful expressions: La cherté de la ville, la nature, l\'éducation', 'Il est important de...']
                }
            ];
        case 'travel-vacation':
            return [
                {
                    action: 'In French, talk about',
                    title: 'The first time you travelled outside of your hometown',
                    hints: [
                        '"Ma ville natale" means "hometown"',
                        '"Mon quartier" means "My neighborhood"',
                        '"J\'ai visité..." means "I visited..."']
                },
                {
                    action: 'Say in French',
                    title: 'Your dream destination',
                    hints: [
                        'You can talk about criteria that make you like a place: \n ' +
                        '"La plage" = "the beach", "Le paysage" = "the landscape", ' +
                        '"l\'hospitalité des populations" = "People\'s hospitality"']
                },
                {
                    action: 'Describe in French',
                    title: 'Why you like traveling',
                    hints: [
                        '"J\'aime découvrir..." means "I like discovering..."',
                        'Useful words: "un nouveau paysage", "les cultures", "L\'histoire"',
                    ]
                },
            ];
        case 'hobbies-games':
            return [];
        case 'food-cuisines':
            return [];
        case 'traffic-transportation':
            return [];
        case 'occupations-jobs':
            return [];
        case 'city':
            return [];
        case 'weather':
            return [];
        default:
            return [];
    }
};