var assert = require('assert');
var Trie = require('../src/trie.js');

describe('Trie', function() {
    describe("empty emotions: []", function(){
        var trie = new Trie();
        beforeEach(function(){
            trie.build([]);
        });
        it('should return [] for ""', function(){
            assert.deepEqual(trie.search(''), []);
        });
        it('should return [] for "abcd"', function() {
            assert.deepEqual(trie.search('abcd'), []);
        });
    });

    describe('simple emotions: abc, abd', function() {
        var trie = new Trie();
        beforeEach(function(){
            trie.build(['abc', 'abd']);
        });
        it('should return [] for ""', function() {
            assert.deepEqual(trie.search(''), []);
        });
        it('should return [[0, 0]] for "abcd"', function() {
            assert.deepEqual(trie.search('abcd'), [ [0, 0] ]) ;
        });
        it('should return [[0, 0], [4 , 1]] for "abcdabd"', function() {
            assert.deepEqual(trie.search('abcdabd'), [ [0, 0], [4, 1] ]);
        });
        it('should return [[0, 0], [4 , 0]] for "abcdabcd"', function() {
            assert.deepEqual(trie.search('abcdabcd'), [ [0, 0], [4, 0] ]);
        });
    });

    describe('cyclic emotions: aba', function() {
        var trie = new Trie();
        beforeEach(function(){
            trie.build(['aba']);
        });
        it('should return [[0, 0]] for "abab"', function() {
            assert.deepEqual(trie.search('abab'), [[0, 0]]);
        });
        it('should return [[0, 0]] for "ababa"', function() {
            assert.deepEqual(trie.search('ababa'), [[0, 0]]);
        });
    });

    describe('actual emotions: /::), /::(', function() {
        var trie = new Trie();
        beforeEach(function(){
            trie.build(['/::)', '/::(']);
        });
        it('should return [[1, 0]] for "//::)/::x"', function() {
            assert.deepEqual(trie.search('//::)/::x'), [ [1, 0] ] );
        });
        it('should return [[3, 1]] for "/::/::("', function() {
            assert.deepEqual(trie.search('/::/::('), [ [3, 1] ] );
        });
    });
});