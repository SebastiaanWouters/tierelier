import { writable } from "svelte/store";

export const dragged = writable<{ src: string, id: string} | null>(null);
export const dropTarget = writable<string>("");
export const dropSame = writable<boolean>(false);

dragged.subscribe((value) => {
	console.log(value)
})

export function draggable(node: HTMLElement, data: string) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handle_dragstart(e: DragEvent) {
		node.style.cursor = 'grab'; // Cursor style during drag
		if (!e.dataTransfer) return;
        console.log(node.id)
		e.dataTransfer.setData('src', state);
		e.dataTransfer.setData('node-id', node.id);
	}

	 function handle_dragend(e: DragEvent) {
    	node.style.cursor = 'grab'; // Revert cursor style after drag ends
  	}

	node.addEventListener('dragstart', handle_dragstart);
	node.addEventListener('dragend', handle_dragend); // New event listener for dragend


	return {
		update(data: string) {
			state = data;
		},

		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
			node.removeEventListener('dragend', handle_dragend); // Remove the event listener for dragend
		}
	};
}

export function dropzone(node: HTMLElement) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'droppable',
	};

	function handle_dragenter(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e: DragEvent ) {
		e.preventDefault();
		if (!e.dataTransfer) return;
	}

	function handle_drop(e: DragEvent) {
		e.preventDefault();
        if (!e.dataTransfer) return;

		const draggedNodeId = e.dataTransfer.getData('node-id');
		if (draggedNodeId) {
		const draggedNode = document.getElementById(draggedNodeId);
		if (draggedNode) {
			draggedNode.remove();
		}
		}
		
         // Create the new div element
        const newImg = document.createElement('img');
        newImg.style.height = '100%';
		 newImg.style.maxHeight = '20vmin';
        newImg.style.padding = '1rem';
        const data = e.dataTransfer.getData('src');
        newImg.src = data;  // You could also set any other properties you need
		newImg.id =  e.dataTransfer.getData('node-id');

		draggable(newImg, data);

        // Append the new div to the drop target (the node)
        node.appendChild(newImg);
        
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}
