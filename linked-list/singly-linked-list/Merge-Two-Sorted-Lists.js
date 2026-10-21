/* 
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.
*/

var mergeTwoLists = function (list1, list2) {
    const result = new ListNode();
    let temp = result;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            temp.next = list1;
            list1 = list1.next;
        } else {
            temp.next = list2;
            list2 = list2.next;
        }
        temp = temp.next;
    }

    temp.next = list1 != null ? list1 : list2;

    return result.next;
};
