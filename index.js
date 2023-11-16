const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function Node(data, left, right) {
  return { data, left, right };
}

function Tree(arr, root) {
  root = buildTree();
  return { arr, root };
}

function buildTree(arr) {
  const data = prepArr(arr);
  return data;
}

function mergeSort(array) {
  const half = array.length / 2;
  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function prepArr(arr) {
  return mergeSort(removeDuplicates(arr));
}
