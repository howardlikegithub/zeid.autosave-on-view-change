/* global define, brackets, window, $ */

/**
 * Autosaves the current file when changing files or when changing from Brackets to something else.
 * Will not try to save untitled documents.
 */
define(function() {
    'use strict';
    
    var CommandManager = brackets.getModule("command/CommandManager"),
        Commands = brackets.getModule("command/Commands"),
        DocumentManager = brackets.getModule("document/DocumentManager");
    
    /**
     * Saves a document.
     * @param {Document} doc
     */
    function save(doc) {
        if(doc && !doc.isUntitled() && doc.isDirty) {
            CommandManager.execute(Commands.FILE_SAVE, {doc: doc});
        }
    }
    
    $(DocumentManager).on('currentDocumentChange', function(e, currDoc, prevDoc) {
        save(prevDoc);
    });
    
    var secondBlur = false;
    $(window).on('blur', function(e) {
        save(DocumentManager.getCurrentDocument());
    });
});
