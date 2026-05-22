# Epic and Story Plan for Frontend Development

## FE-1: Drafting Workspace

### FE-1.1 - Topic Prompt and Workspace Shell

Type: Story

Priority: P0

Summary: As a participant, I want to see the topic prompt, editor, and visualization region in one workspace so that I can write and reflect without changing screens.

Acceptance Criteria

- The active topic is displayed prominently at the top of the page.
- The editor and graph areas are visible in the same workspace.
- The UI loads into the participant's active draft state when available.
- The workspace supports both an empty-state and a populated-state layout.
- The layout is responsive on common desktop widths.

### FE-1.2 - Long-Form Draft Editor

Type: Story

Priority: P0

Summary: As a participant, I want a long-form editor so that I can compose a structured response instead of sending chat messages.

Acceptance Criteria

- The editor supports multi-paragraph text input.
- The editor preserves formatting during editing.
- The editor autosaves locally while typing.
- The editor restores content after refresh or navigation.
- The UI does not present the editor as a chat transcript.

### FE-1.3 - Draft Autosave and Restore

Type: Story

Priority: P0

Summary: As a participant, I want my work autosaved so that I do not lose revisions.

Acceptance Criteria

- Draft changes are autosaved at a defined interval or debounce threshold.
- Saved state is visibly confirmed to the user.
- A failed save is indicated clearly and retried.
- The draft is restored after page reload.
- The most recent local revision is preserved when the network is temporarily unavailable.

### FE-1.4 - Revision History and Replay

Type: Story

Priority: P1

Summary: As a participant, I want to view previous draft revisions so that I can revisit how my reasoning changed over time.

Acceptance Criteria

- The UI shows a revision timeline or history list.
- A user can open a prior revision.
- A prior revision can be compared with the current revision.
- The view shows timestamps for revisions.
- Revision history is available without leaving the workspace.

## FE-2: Socratic Guidance

### FE-2.1 - Ideate Action

Type: Story

Priority: P0

Summary: As a participant, I want an Ideate action so that I can request reflective prompts on my current draft.

Acceptance Criteria

- The editor includes a clearly labeled Ideate control button.
- Clicking Ideate submits the current draft revision to the backend.
- The UI shows a pending state while prompts are being generated.
- A successful request results in a new prompt set displayed in the UI.
- A failed request is shown with a retryable error state.

### FE-2.2 - Prompt Display Panel

Type: Story

Priority: P0

Summary: As a participant, I want Socratic prompts displayed as advisory questions so that I can use them during revision.

Acceptance Criteria

- Prompts are displayed as a list of questions.
- Each question is visually separated from the draft editor.
- Prompt content is not rendered as a chat conversation.
- The user can dismiss, collapse, or archive prompt sets.
- The latest prompt set is accessible from the current draft view.

### FE-2.3 - Prompt Categories and Labels

Type: Story

Priority: P1

Summary: As a participant, I want prompts labeled by type so that I can quickly understand what each question is asking me to examine.

Acceptance Criteria

- Each prompt shows a category label such as assumption, evidence, counterargument, clarification, or criteria.
- Prompt categories are visually distinct.
- The UI can display mixed categories in one prompt set.
- Labels remain visible when the prompt is expanded.

### FE-2.4 - Reference Display for Prompts

Type: Story

Priority: P1

Summary: As a participant, I want supporting references shown with prompts so that I can inspect suggested evidence.

Acceptance Criteria

- A prompt can display one or more references.
- Each reference shows title and source metadata when available.
- References are expandable or linkable from the prompt.
- Prompts with no references still render correctly.

### FE-2.5 - Non-Chat Interaction Constraint

Type: Story

Priority: P0

Summary: As a participant, I want the interaction to remain draft-oriented rather than chat-oriented so that I stay in a reflective writing mode.

Acceptance Criteria

- The UI does not show a back-and-forth message thread with the agent.
- The user cannot send direct replies to Socratic prompts as chat messages.
- Prompts are positioned as reading and revision aids.
- The submit flow remains separate from prompt review.

## FE-3: Personal Discourse Graph

### FE-3.1 - Live Personal Graph View

Type: Story

Priority: P0

Summary: As a participant, I want a personal discourse graph so that I can see my reasoning become explicit as I revise.

Acceptance Criteria

- The graph type is discourse graph.
- The graph panel renders nodes and edges from the personal graph.
- The graph updates after a successful reflection event.
- The graph remains linked to the active draft.
- The graph can be collapsed or expanded from the workspace.

### FE-3.2 - Graph Node and Edge Visualization

Type: Story

Priority: P0

Summary: As a participant, I want to see claims, evidence, assumptions, and relations in the graph so that I can inspect my reasoning structure.

Acceptance Criteria

- Different node types are visually distinguishable.
- Different edge types are visually distinguishable.
- Node details are inspectable on click or hover.
- The graph can show at least claims, evidence, support, attack, and assumption-related elements.

### FE-3.3 - Graph Update Highlights

Type: Story

Priority: P1

Summary: As a participant, I want changed graph elements highlighted so that I can understand what each revision added or altered.

Acceptance Criteria

- Newly added nodes are visually marked.
- Updated nodes are visually marked.
- Removed or merged nodes are represented clearly.
- A revision delta view is available from the graph panel.

### FE-3.4 - Graph History Snapshot Selector

Type: Story

Priority: P1

Summary: As a participant, I want to move between graph snapshots so that I can revisit prior reasoning states.

Acceptance Criteria

- The graph panel exposes a snapshot or version selector.
- A selected snapshot renders the corresponding graph state.
- The current snapshot is clearly indicated.
- Switching snapshots does not lose the current draft text.

### FE-3.5 - Graph Provenance Display

Type: Story

Priority: P1

Summary: As a participant, I want graph provenance visible so that I can trust that nodes reflect my text.

Acceptance Criteria

- A node shows source draft or revision metadata.
- A node can display the originating text span or excerpt.
- Provenance is accessible without leaving the graph view.
- Provenance remains available after graph updates and refreshes.

## FE-4: Submission and Collaborative Graph

### FE-4.1 - Submit Action

Type: Story

Priority: P0

Summary: As a participant, I want a Submit action so that I can publish my finalized contribution when ready.

Acceptance Criteria

- The editor includes a clearly labeled Submit control button.
- Clicking Submit sends the finalized draft to the backend.
- The UI shows a pending state while submission is processed.
- Submission success is confirmed visibly.
- Submission failure is shown with a retry option.

### FE-4.2 - Collaborative Graph View

Type: Story

Priority: P0

Summary: As a participant, I want to view the collaborative discourse graph in a "Collaborative Graph" tab so that I can see how my contribution fits into the larger discussion.

Acceptance Criteria

- The collaborative graph is accessible after submission.
- The graph displays claims, clusters, and relationships across participants.
- The view supports navigation of the group problem space.
- The graph updates when new contributions are accepted.

### FE-4.3 - Cluster and Contention Visualization

Type: Story

Priority: P1

Summary: As a participant, I want clusters and points of contention shown clearly so that I can identify agreement and disagreement.

Acceptance Criteria

- The graph distinguishes clusters from individual nodes.
- The graph highlights divergence or contention regions.
- The graph can show convergence and disagreement at a glance.
- Cluster details are inspectable on click or hover.

### FE-4.4 - Contribution Traceability

Type: Story

Priority: P1

Summary: As a participant, I want traceability from graph nodes back to original submissions so that I can verify how my contribution was used.

Acceptance Criteria

- A collaborative node shows original submission provenance.
- Merged nodes preserve links to source contributions.
- The UI exposes author and submission metadata where permitted.
- Traceability remains available after clustering or node merging.

### FE-4.5 - Contributions View

Type: Story

Priority: P1

Summary: As a participant, I want a Contributions view so that I can review my own submissions alongside others.

Acceptance Criteria

- The UI includes a dedicated Contributions tab.
- The tab lists all participants' submissions.
- Each submission links to its associated personal graph snapshot.
- Each submission entry includes timestamp and other relevant metadata.
- The page can show other participants' submissions.
- The view supports opening a submission in context.

### FE-4.6 - Support/Challenge Filters

Type: Story

Priority: P1

Summary: As a participant, I want filters for support and challenge relations so that I can inspect how my contribution relates to the discourse.

Acceptance Criteria

- The graph supports filtering by supports, challenges, or both.
- The user can filter to only their own contributions.
- Filters update the graph without reloading the page.
- The active filter state is visible in the UI.

## FE-5: Agency, Accessibility, and Trust

### FE-5.1 - User Agency Messaging

Type: Story

Priority: P0

Summary: As a participant, I want the UI to make clear that prompts are advisory so that I remain in control of my final wording.

Acceptance Criteria

- The interface indicates that prompts are optional.
- The interface states that the user controls final submission.
- The UI does not imply that the agent is authoring on the user's behalf.
- Prompt actions are separate from submission actions.

### FE-5.2 - Keyboard and Screen Reader Accessibility

Type: Story

Priority: P0

Summary: As a participant, I want keyboard and screen-reader support so that I can use the system accessibly.

Acceptance Criteria

- All main controls are keyboard reachable.
- Focus order is logical across the workspace.

### FE-5.3 - Loading, Error, and Empty States

Type: Story

Priority: P0

Summary: As a participant, I want clear loading and error states so that I understand what the system is doing.

Acceptance Criteria

- The UI shows loading states for prompt generation, graph refresh, and submission.
- Empty states are shown when no graph data exists yet.
- Error states include a clear next action.
- Loading states do not block local draft editing unless necessary.

### FE-5.4 - Responsive Layout

Type: Story

Priority: P1

Summary: As a participant, I want the workspace to adapt to screen size so that I can use it on standard desktop displays.

Acceptance Criteria

- The layout remains usable at common desktop resolutions.
- Panels resize without breaking the editor or graph.
- Critical actions remain visible at moderate viewport widths.
- The interface degrades gracefully when horizontal space is constrained.
