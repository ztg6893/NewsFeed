var x = "display:none";
function myGetElementsByClassName(selector) {
    if ( document.getElementsByClassName ) {
        return document.getElementsByClassName(selector);
    }

    var returnList = new Array();
    var nodes = document.getElementsByTagName('div');
    var max = nodes.length;
    for ( var i = 0; i < max; i++ ) {
        if ( nodes[i].className == selector ) {
            returnList[returnList.length] = nodes[i];
        }
    }
    return returnList;
}


var rssReader = {
    containers : null,

    // initialization function
    init : function(selector) {
        containers = myGetElementsByClassName(selector);
        //document.getElementById("worldId").style.display="none";
        if (document.getElementById("all").value=="world"){
            document.getElementById("techId").style.display="none";
            document.getElementById("sportsId").style.display="none";
            document.getElementById("wheatherId").style.display="none";
        }
        
        else if (document.getElementById("all").value=="tech"){
            alert("hey");
            document.getElementById("worldId").style.display="none";
            document.getElementById("sportsId").style.display="none";
            document.getElementById("wheatherId").style.display="none";
        }
        
        else if (document.getElementById("all").value=="sports"){
            document.getElementById("worldId").style.display="none";
            document.getElementById("techId").style.display="none";
            document.getElementById("wheatherId").style.display="none";
        }
        
        else if (document.getElementById("all").value=="weaather"){
            document.getElementById("worldId").style.display="none";
            document.getElementById("sportsId").style.display="none";
            document.getElementById("techId").style.display="none";
        }
        
        for(i=0;i<containers.length;i++){
            // getting necessary variables
            var rssUrl = containers[i].getAttribute('rss_url');
            var num = containers[i].getAttribute('rss_num');
            var id = containers[i].getAttribute('id');

            // creating temp scripts which will help us to transform XML (RSS) to JSON
            var url = encodeURIComponent(rssUrl);
            var googUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&q='+url+'&callback=rssReader.parse&context='+id;

            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('charset','utf-8');
            script.setAttribute('src',googUrl);
            containers[i].appendChild(script);
        }
    },

    // parsing of results by google
    parse : function(context, data) {
        var container = document.getElementById(context);
        container.innerHTML = '';

        // creating list of elements
        var mainList = document.createElement('ul');

        // also creating its childs (subitems)
        var entries = data.feed.entries;
        for (var i=0; i<entries.length; i++) {
            var listItem = document.createElement('li');
            var title = entries[i].title;
            var contentSnippet = entries[i].contentSnippet;
            var contentSnippetText = document.createTextNode(contentSnippet);

            var link = document.createElement('a');
            link.setAttribute('href', entries[i].link);
            link.setAttribute('target','_blank');
            var text = document.createTextNode(title);
            link.appendChild(text);

            // add link to list item
            listItem.appendChild(link);

            var desc = document.createElement('p');
            desc.appendChild(contentSnippetText);

            // add description to list item
            listItem.appendChild(desc);

            if (entries[i].mediaGroups) {
                var img = new Image();
                img.src = entries[i].mediaGroups[0].contents[0].url;
                listItem.appendChild(img);
            }

            // adding list item to main list
            mainList.appendChild(listItem);
        }
        container.appendChild(mainList);
    }
};
function display(){
            if (document.getElementById("all").value=="world"){
            document.getElementById("techId").style.display="none";
            document.getElementById("sportsId").style.display="none";
            document.getElementById("wheatherId").style.display="none";
            document.getElementById("worldId").style.display="block";
        }
        
        else if (document.getElementById("all").value=="tech"){
            document.getElementById("worldId").style.display="none";
            document.getElementById("sportsId").style.display="none";
            document.getElementById("wheatherId").style.display="none";
            document.getElementById("techId").style.display="block";
        }
        
        else if (document.getElementById("all").value=="sports"){
            document.getElementById("worldId").style.display="none";
            document.getElementById("techId").style.display="none";
            document.getElementById("wheatherId").style.display="none";
            document.getElementById("sportsId").style.display="block";
        }
        
        else if (document.getElementById("all").value=="weather"){
            document.getElementById("worldId").style.display="none";
            document.getElementById("sportsId").style.display="none";
            document.getElementById("techId").style.display="none"; 
            document.getElementById("wheatherId").style.display="block";
        }
        
        else if (document.getElementById("all").value=="showall"){
            document.getElementById("worldId").style.display="block";
            document.getElementById("sportsId").style.display="block";
            document.getElementById("techId").style.display="block";
            document.getElementById("wheatherId").style.display="block";
        }
    
}

window.onload = function() {
    rssReader.init('post_results');
    
}