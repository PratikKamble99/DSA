import math

grid = [[2,1,1],[1,2,0],[0,1,1]]

def orangesRotting(grid: list[list[int]]) -> int:
    if grid == None or len(grid) == 0: return -1
    rows, cols = len(grid), len(grid[0])

    # fill all rottn and fresh with Infinity days and empty with -infinte
    time = [[math.inf if grid[r][c] == 2 or grid[r][c] == 1 else -math.inf for c in range(cols)] for r in range(rows)]

    for r in range(rows):
        for c in range(cols):
            # if rotten orange start rotting adjucent cells 
            if grid[r][c] == 2:
                dfs(grid, time, r, c, 0)
    
    time_req = 0

    for r in range(rows):
        for c in range(cols):
            # organge is fresh so that cell must have rotten time
            if grid[r][c] == 1:
                # If current orange has fresh after calculating all rotten days return -1
                if time[r][c] == math.inf: return -1
                # get max time equired by checking every organge rotte time
                time_req = max(time_req, time[r][c])


    print(time, time_req)


def dfs(grid, time, r, c, currentDays):
    if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0])  or time[r][c] <= currentDays:
        return 

    time[r][c] = currentDays
    dfs(grid, time, r-1, c, currentDays+1)
    dfs(grid, time, r+1, c, currentDays+1)
    dfs(grid, time, r, c-1, currentDays+1)
    dfs(grid, time, r, c+1, currentDays+1)


from collections import deque

def orangesRotting_2(grid: list[list[int]]) -> int:
    rows,cols=len(grid),len(grid[0])
    q=deque()
    fresh=0
    for r in range(rows):
        for c in range(cols):
            # if rotten orange add to queue
            if grid[r][c]==2:
                q.append((r,c))
            # if fresh count it
            elif grid[r][c]==1:
                fresh+=1
    directions=[(0,1),(1,0),(-1,0),(0,-1)]
    mins=0

    # while loop until queue is not empty and fresh oranges are there
    while q and fresh>0:
        # process all rotten oranges in the queue
        for _ in range(len(q)):
            r,c =q.popleft()
            # check all 4 directions for fresh oranges left and right, up and down
            for dr,dc in directions:
                nr,nc=r+dr,c+dc
                # if the new row and column are within bounds and the cell has a fresh orange
                if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1:
                    #rot it
                    grid[nr][nc]=2
                    fresh-=1
                    # add to queue
                    q.append((nr,nc))
        mins+=1
    return mins if fresh==0 else -1

print(orangesRotting(grid))