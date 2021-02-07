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
  // You will need more props...
}

function RenderNode({ node }: RenderNodeProps) {
  const handleAdd = (e: MouseEvent) => {
    // Action for when [+] is clicked on a node
  }
  const handleDelete = (e: MouseEvent) => {
    // Action for when [x] is clicked on a node
  }
  return (
    // Placeholder example tree nodes
    // Rewrite this to dynamically render the tree using the data
    <div className="node">
      <div className="node-name" style={{ backgroundColor: colors[0] }}>
        {node.name}
        <button className="node-action" onClick={handleAdd}>
          +
        </button>
      </div>
      {node.subordinates !== undefined &&
        node.subordinates.map((el, i) => {
          return (
            <div key={el.name + i} className="node-subordinates">
              <RenderNode node={el} />
            </div>
          )
        })}
      {/* <div className="node-subordinates">
        <div className="node">
          <div className="node-name" style={{ backgroundColor: colors[1] }}>
            CTO
            <button className="node-action" onClick={handleAdd}>
              +
            </button>
            <button className="node-action" onClick={handleDelete}>
              x
            </button>
          </div>
          <div className="node-subordinates">
            <div className="node-name" style={{ backgroundColor: colors[2] }}>
              Sr. VP
              <button className="node-action" onClick={handleAdd}>
                +
              </button>
              <button className="node-action" onClick={handleDelete}>
                x
              </button>
            </div>
            <div className="node-name" style={{ backgroundColor: colors[3] }}>
              Sr. VP
              <button className="node-action" onClick={handleAdd}>
                +
              </button>
              <button className="node-action" onClick={handleDelete}>
                x
              </button>
            </div>
          </div>
          <div className="node-name" style={{ backgroundColor: '#EA5A21' }}>
            CFO
            <button className="node-action" onClick={handleAdd}>
              +
            </button>
            <button className="node-action" onClick={handleDelete}>
              x
            </button>
          </div>
          <div className="node-subordinates">
            <div className="node-name" style={{ backgroundColor: '#3BB36C' }}>
              Sr. VP
              <button className="node-action" onClick={handleAdd}>
                +
              </button>
              <button className="node-action" onClick={handleDelete}>
                x
              </button>
            </div>
            <div className="node-name" style={{ backgroundColor: '#77B7BC' }}>
              Sr. VP
              <button className="node-action" onClick={handleAdd}>
                +
              </button>
              <button className="node-action" onClick={handleDelete}>
                x
              </button>
            </div>
          </div>
        </div>
      </div> */}
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
  console.log(Object.keys(items).length)
  return (
    <div className="legend">
      <div className="legend-head">Location</div>
      {Object.entries(items).map(([location, color], i) => (
        <div className="legend-item" key={i} style={{ backgroundColor: color }}>
          {location}
        </div>
      ))}
      {Object.keys(items).map((el) => {
        console.log('hi')
      })}
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
  // const [legendItems] = useState<LegendItems>({})

  // Rewrite this to populate the legend from the tree data
  const legendItems: LegendItems = {
    //   'Example 1': colors[0],
    //   'Example 2': colors[1],
    //   'Example 3': colors[2],
  }

  const populateLegend = (node: Node): void => {
    if (!(node.location in legendItems)) {
      legendItems[node.location] = colors[Object.keys(legendItems).length]
    }
    if (node.subordinates !== undefined) {
      for (let i = 0; i < node.subordinates.length; i++) {
        populateLegend(node.subordinates[i])
      }
    }
  }

  useEffect(() => {
    populateLegend(root)
  }, [root])

  const addNode = () => {
    // ...
  }

  const clearNode = () => {
    // ...
  }

  console.log('HERE', legendItems)

  return (
    <div className="app">
      <RenderNode
        node={root}
        // You will need more props...
      />
      <Legend items={legendItems} />
      <NodeForm
        node={{ name: 'Fix me', location: 'Fix me' }}
        submitNode={addNode}
        clearNode={clearNode}
      />
    </div>
  )
}
