// Custom script to disable download functionality
window.addEventListener('DOMContentLoaded', function() {
  // Wait for the viewer to be fully initialized
  document.addEventListener('webviewerloaded', function() {
    // Access PDFViewerApplication after it's initialized
    PDFViewerApplication.initializedPromise.then(function() {
      // Disable print functionality
      PDFViewerApplication.appConfig.toolbar.print.classList.add('hidden');
      
      // Disable download functionality
      PDFViewerApplication.appConfig.secondaryToolbar.downloadButton.classList.add('hidden');
      
      // Disable save functionality from the menu
      if (PDFViewerApplication.appConfig.secondaryToolbar.saveAsButton) {
        PDFViewerApplication.appConfig.secondaryToolbar.saveAsButton.classList.add('hidden');
      }
      
      // Disable opening file functionality
      PDFViewerApplication.appConfig.toolbar.openFile.classList.add('hidden');
      
      // Add title
      const title = document.querySelector('.title');
      if (title) {
        title.textContent = "Просмотр документа";
      }

      // Disable right-click context menu on the viewer
      document.getElementById('viewerContainer').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });
    });
  });
});
