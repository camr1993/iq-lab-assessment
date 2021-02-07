import { clear } from 'console'
import { FormEvent, useRef, useState, MouseEvent, useEffect } from 'react'
import { colors, tree, Node } from './data'
import './styles.css'

/*
  This is a partially complete React + Typescript app that
  renders a simple representation of a tree heirarchy using HTML.

  The data to be rendered as a tree is in ./data.ts and is already being
  loaded into local state in App().

  Currently this data is not being rendered. There is only some placeholder HTML
  in RenderNode() to show what the HTML structure looks like. You should rewrite
  RenderNode() to:

    1. render the tree data
    2. make the add/delete actions work
    3. color each node so that it matches the location legend

  The tree is supposed to allow you to add a child to any node by
  clicking the [+] button on that node which should display the NodeForm().

  Submitting NodeForm() should create a new child node on the node where [+]
  was clicked.

  NodeForm() should not be displayed unless [+] has been clicked on a node.

  The tree is supposed to allow you to delete a node (including its descendants)
  from the tree by clicking the [x] button on the node. You should not be able
  to delete the root node.

  Each tree node has a location property. The location legend in the bottom
  right is supposed to list all the locations in the tree once using a color
  from the color array in ./data.ts. Each tree node should be correctly colored
  according to the legend. You can assume there are less unique locations
  in the tree than there are entries in the colors array. When nodes are
  added/removed from the tree, the legend contents and colors should update.

  Notes:
    1. You can add more components but no more are needed
    2. The NodeForm() & Legend() components don't need to be changed (but you can)
    3. You will need to write some new helper & callback functions
    4. Do not use the 'any' type
    5. Please do not rename this sandbox after you fork it. Leave it named "React"
    6. Create a free CodeSandBox account so you can save your work
*/

interface RenderNodeProps {
  node: Node
  previousNode: Node | null
  items: LegendItems
  level: number
  setDisplayForm: (bool: boolean) => void
  setSelectedNode: (node: Node) => void
  clearNode: () => void
}

function RenderNode({
  node,
  items,
  level,
  previousNode,
  setDisplayForm,
  setSelectedNode,
  clearNode,
}: RenderNodeProps) {
  const handleAdd = (e: MouseEvent) => {
    // Action for when [+] is clicked on a node
    setDisplayForm(true)
    setSelectedNode(node)
  }
  const handleDelete = (e: MouseEvent) => {
    // Action for when [x] is clicked on a node
    // search through previous node, and remove the current node from the subordinates array
    if (previousNode && previousNode.subordinates) {
      for (let i = 0; i < previousNode.subordinates.length; i++) {
        if (previousNode.subordinates[i] === node) {
          previousNode.subordinates = [
            ...previousNode.subordinates.slice(0, i),
            ...previousNode.subordinates.slice(i + 1),
          ]
        }
      }
    }
    clearNode()
  }
  return (
    <div className="node">
      <div
        className="node-name"
        style={{ backgroundColor: items[node.location] }}
      >
        {node.name}
        <button className="node-action" onClick={handleAdd}>
          +
        </button>
        {level !== 0 && (
          <button className="node-action" onClick={handleDelete}>
            x
          </button>
        )}
      </div>
      {node.subordinates !== undefined &&
        node.subordinates.map((el, i) => {
          return (
            <div key={el.name + i} className="node-subordinates">
              <RenderNode
                node={el}
                items={items}
                level={level + 1}
                setDisplayForm={setDisplayForm}
                setSelectedNode={setSelectedNode}
                clearNode={clearNode}
                previousNode={node}
              />
            </div>
          )
        })}
    </div>
  )
}

interface LegendItems {
  [location: string]: string
}

interface LegendProps {
  items: LegendItems
}

function Legend({ items }: LegendProps) {
  return (
    <div className="legend">
      <div className="legend-head">Location</div>
      {Object.entries(items).map(([location, color], i) => (
        <div className="legend-item" key={i} style={{ backgroundColor: color }}>
          {location}
        </div>
      ))}
    </div>
  )
}

interface NodeFormProps {
  node: Node
  submitNode: (parent: Node, newNode: Node) => void
  clearNode: () => void
}

function NodeForm({ node, submitNode, clearNode }: NodeFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(
      new FormData(formRef.current!).entries()
    )
    const newNode = {
      name: formData.name as string,
      location: formData.location as string,
    }
    submitNode(node, newNode)
    clearNode()
  }
  return (
    <form autoComplete="off" ref={formRef} onSubmit={onSubmit}>
      <div>Adding child node to: {node.name}</div>
      <input type="text" name="name" placeholder="Name" required />
      <input type="text" name="location" placeholder="Location" required />
      <input type="submit" value="Submit" />
      <input type="button" value="Cancel" onClick={clearNode} />
    </form>
  )
}

export default function App() {
  const [root] = useState(() => tree())
  const [legendItems, setLegendItems] = useState<LegendItems>({})
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [selectedNode, setSelectedNode] = useState<Node>({
    name: '',
    location: '',
  })

  // function to traverse tree, and extract the locations. Each location is saved an an object key with the value being the next color available in the colors array
  const populateLegend = (node: Node, items: LegendItems): LegendItems => {
    if (!(node.location in items)) {
      items[node.location] = colors[Object.keys(items).length]
    }
    if (node.subordinates !== undefined) {
      for (let i = 0; i < node.subordinates.length; i++) {
        populateLegend(node.subordinates[i], items)
      }
    }
    return items
  }

  // useEffect calls the populate legend function, and sets the state of legendItems. This triggers a re-render for the Legend component
  useEffect(() => {
    let items = populateLegend(root, {})
    setLegendItems({
      ...legendItems,
      ...items,
    })
  }, [root])

  const addNode = () => {
    // ...
  }

  const clearNode = () => {
    // This function toggles the form off and clears the selected node
    setDisplayForm(false)
    setSelectedNode({
      ...selectedNode,
      name: '',
      location: '',
    })
  }

  return (
    <div className="app">
      <RenderNode
        node={root}
        items={legendItems}
        level={0}
        setDisplayForm={setDisplayForm}
        setSelectedNode={setSelectedNode}
        clearNode={clearNode}
        previousNode={null}
      />
      <Legend items={legendItems} />
      {displayForm && (
        <NodeForm
          node={{ name: selectedNode.name, location: selectedNode.location }}
          submitNode={addNode}
          clearNode={clearNode}
        />
      )}
    </div>
  )
}
