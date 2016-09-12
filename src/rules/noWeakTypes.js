export default function(context) {
  const types = ['Object', 'Function'];

  function generateMessage(type) {
    return `Do not use ${type} types.\nSee https://github.com/flowtype/flow-typed/blob/master/CONTRIBUTING.md#library-definition-best-practices for more info`;
  }

  function checkNode(node) {
    switch (node.type) {
      case 'AnyTypeAnnotation':
        context.report(node, generateMessage('any'));
        break;

      case 'GenericTypeAnnotation':
        if (types.indexOf(node.id.name) !== -1) {
          context.report(node, generateMessage(node.id.name));
        }
        break;

      case 'ObjectTypeProperty':
        checkNode(node.value);
        break;

      default:
        break;
    }
  }

  return {
    Identifier(node) {
      if (node.typeAnnotation) {
        checkNode(node.typeAnnotation.typeAnnotation);
      } else if (node.parent.right && node.parent.right.type === 'ObjectTypeAnnotation') {
        node.parent.right.properties.forEach(n => checkNode(n));
      }
    },
  };
}
