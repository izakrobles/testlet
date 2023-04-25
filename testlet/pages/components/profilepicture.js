class ImageNode {
    constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.next = null;
    }
}

class ImageList {
    constructor() {
    this.head = null;
}
    
    addImage(imageUrl) {
        // Create a new node for the image
        const newNode = new ImageNode(imageUrl);
    
        // If the list is empty, set the head to the new node
        if (!this.head) {
            this.head = newNode;
            return;
        }
    
        // Find the last node in the list
        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
    
        // Add the new node to the end of the list
        currentNode.next = newNode;
    }
}
  
const imageList = new ImageList();
imageList.addImage("https://ia803204.us.archive.org/4/items/discordprofilepictures/discordblue.png");
imageList.addImage("https://ia803204.us.archive.org/4/items/discordprofilepictures/discordred.png");
imageList.addImage("https://i.pinimg.com/originals/7c/8f/47/7c8f476123d28d103efe381543274c25.png");


function pfp(props) {
  return (
    <div>
        <img id="image" src="" alt="Image" data-index="0"/>
    </div>
  );
}

export default pfp;
